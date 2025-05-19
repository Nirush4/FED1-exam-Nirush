import { displayUserNav } from './manage.mjs';

let allPosts = [];
let editingPostId = null;

displayUserNav();

function formatContent(content) {
  const lines = content.split('\n').map((line) => line.trim());
  const formattedSections = [];
  let currentSection = null;

  lines.forEach((line) => {
    if (!line) return;

    const numberMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (numberMatch) {
      if (currentSection) {
        formattedSections.push(currentSection);
      }

      const sectionNumber = numberMatch[1];
      const titleText = numberMatch[2];
      currentSection = `<h3 style="font-size:1.2rem; font-weight:600; font-family: 'Poppins', sans-serif; margin-bottom: 1.2rem; ">${sectionNumber}. ${titleText}</h3>`;
    } else {
      const paragraphHTML = `<p>${line}</p>`;
      if (currentSection) {
        currentSection += paragraphHTML;
      } else {
        formattedSections.push(paragraphHTML);
      }
    }
  });

  if (currentSection) {
    formattedSections.push(currentSection);
  }

  return formattedSections.join('\n');
}

async function fetchAllPosts() {
  const token = sessionStorage.getItem('userToken');
  const username = sessionStorage.getItem('userName') || 'Nirush';

  if (!token) return;

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      allPosts = data.data || [];
    } else {
      console.error('Failed to fetch posts:', response.status);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

export function setupEditButtons() {
  const editButtons = document.querySelectorAll('.edit-btn');
  editButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const postId = button.dataset.id;
      localStorage.setItem('editPostId', postId);
      window.location.href = `/post/edit.html`;
    });
  });
}

function loadPostIntoForm(post) {
  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');
  const imageUrlInput = document.getElementById('imageUrl');
  const imageAltInput = document.getElementById('imageAlt');
  const tagsInput = document.getElementById('tags');

  if (
    titleInput &&
    contentInput &&
    imageUrlInput &&
    imageAltInput &&
    tagsInput
  ) {
    titleInput.value = post.title || '';

    contentInput.value = post.body || '';
    imageUrlInput.value = post.media?.url || '';
    imageAltInput.value = post.media?.alt || '';
    tagsInput.value = post.tags?.join(', ') || '';
    editingPostId = post.id;

    const submitButton = document.querySelector('#postForm .publish');
    if (submitButton) {
      submitButton.value = 'Update Post';
      submitButton.setAttribute('aria-label', 'Update existing post');
    }
  } else {
    console.error('One or more form fields not found.');
  }
}

function resetForm() {
  const postForm = document.getElementById('postForm');
  if (postForm) {
    postForm.reset();
  }
  const submitButton = document.querySelector('#postForm .publish');
  if (submitButton) {
    submitButton.value = 'Publish';
    submitButton.setAttribute('aria-label', 'Create new post');
  }
  editingPostId = null;
}

async function updatePost(postData) {
  const token = sessionStorage.getItem('userToken');
  const username = sessionStorage.getItem('userName') || 'Nirush';

  if (!editingPostId) {
    console.error('Post ID is not defined');
    return;
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${username}/${editingPostId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      }
    );

    return response;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

function setupFormSubmission() {
  const postForm = document.getElementById('postForm');
  if (!postForm) {
    console.error('Form with id="postForm" not found in the DOM.');
    return;
  }

  const loader = document.getElementById('loader');

  postForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('content').value.trim();
    const imageUrl = document.getElementById('imageUrl').value.trim();
    const imageAlt = document.getElementById('imageAlt').value.trim();
    const tags = document
      .getElementById('tags')
      .value.trim()
      .split(',')
      .map((tag) => tag.trim());

    if (!title || !body || !imageUrl) {
      displayMessage('Please fill in all required fields.', 'error');
      return;
    }

    const postData = {
      title,
      body: formatContent(body),
      media: {
        url: imageUrl,
        alt: imageAlt,
      },
      tags,
    };

    loader.style.display = 'inline-block';

    try {
      let response;
      if (editingPostId) {
        response = await updatePost(postData);
      } else {
        response = await createPost(postData);
      }

      setTimeout(() => {
        loader.style.display = 'none';

        if (response.ok) {
          alert('✅ Post updated successfully!');

          window.location.href = `/post/manage.html`;
        } else {
          alert('An error occurred. Please try again.');
        }
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        loader.style.display = 'none';
        alert('An error occurred. Please try again.');
        console.error('Error:', error);
      }, 2000);
    }
  });
}

window.onload = async function () {
  await fetchAllPosts();

  const postId = localStorage.getItem('editPostId');
  if (postId) {
    const post = allPosts.find((p) => p.id === postId);
    if (post) {
      loadPostIntoForm(post);
    } else {
      console.warn(`Post with ID ${postId} not found`);
    }
    localStorage.removeItem('editPostId');
  }

  setupFormSubmission();
};
