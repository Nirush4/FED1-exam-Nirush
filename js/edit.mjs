import { displayUserNav } from './manage.mjs';

// Select DOM elements
const postForm = document.querySelector('#post-form');
const loader = document.querySelector('#loader');
const titleInput = document.querySelector('#title');
const contentInput = document.querySelector('#content');
const imageUrlInput = document.querySelector('#imageUrl');
const imageAltInput = document.querySelector('#imageAlt');
const tagsInput = document.querySelector('#tags');
const messageDiv = document.querySelector('#message');

const name = sessionStorage.getItem('userName');
const token = sessionStorage.getItem('userToken');
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// Display the user navigation
displayUserNav(name);

// Fetch post data and pre-fill the form
async function fetchPostData() {
  try {
    const username = sessionStorage.getItem('userName');
    const postUrl = `https://v2.api.noroff.dev/blog/posts/${username}/${postId}`;
    const response = await fetch(postUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch post data');
    }

    const post = await response.json();
    editUpdatePost(post.data);
  } catch (error) {
    console.error('Error fetching post:', error);
    alert('❌ Error fetching post data. Please try again.');
  }
}

// Pre-fill the form with the current post's data
function editUpdatePost(post) {
  titleInput.value = post.title;
  contentInput.value = post.body;
  imageUrlInput.value = post.media.url;
  imageAltInput.value = post.media.alt || 'Blog post image';
  tagsInput.value = post.tags.join(', ');
}

// Handle updating the post
async function handleUpdatePost() {
  const enteredTitle = titleInput.value.trim();
  const enteredBody = contentInput.value.trim();
  const enteredImageUrl = imageUrlInput.value.trim();
  const enteredImageAlt = imageAltInput.value.trim() || 'Blog post image';
  const enteredTags = tagsInput.value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (!enteredTitle || !enteredBody || !enteredImageUrl) {
    alert('Please fill out all required fields.');
    loader.style.display = 'none';
    return;
  }

  try {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: enteredTitle,
        body: enteredBody,
        tags: enteredTags,
        media: {
          url: enteredImageUrl,
          alt: enteredImageAlt,
        },
      }),
    };

    const postUrl = `https://v2.api.noroff.dev/blog/posts/${name}/${postId}`;
    const response = await fetch(postUrl, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to update post: ${response.status}`);
    }

    const responseData = await response.json();
    messageDiv.textContent = '✅ Post updated successfully!';
    messageDiv.style.color = 'green';
    window.location.href = name ? '../post/manage.html' : './index.html';
  } catch (error) {
    console.error('Post update error:', error);
    messageDiv.textContent = '❌ Failed to update post. Please try again.';
    messageDiv.style.color = 'red';
  } finally {
    loader.style.display = 'none';
  }
}

// Trigger update on form submit
postForm.addEventListener('submit', (event) => {
  event.preventDefault();
  loader.style.display = 'flex';

  setTimeout(() => {
    handleUpdatePost();
  }, 1000);
});

// Fetch the post data on page load
fetchPostData();
