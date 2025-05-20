import { displayUserNav } from './manage.mjs';
const postContainer = document.querySelector('.create-new-post-component');
const postForm = document.querySelector('#postForm');
const titleInput = document.querySelector('#title');
const contentInput = document.querySelector('#content');
const imageUrlInput = document.querySelector('#imageUrl');
const imageAltInput = document.querySelector('#imageAlt');
const tagsInput = document.querySelector('#tags');
const loader = document.getElementById('loader');

const name = sessionStorage.getItem('userName');
displayUserNav(name);

postForm.addEventListener('submit', (event) => {
  event.preventDefault();
  loader.style.display = 'flex';

  setTimeout(() => {
    handleCreatePost();
  }, 2000);
});

async function handleCreatePost() {
  const token = sessionStorage.getItem('userToken');
  const username = sessionStorage.getItem('userName');

  if (!token) {
    alert('You must be logged in to publish a post.');
    loader.style.display = 'none';
    return;
  }

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
      method: 'POST',
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

    const postUrl = `https://v2.api.noroff.dev/blog/posts/${username}`;
    const response = await fetch(postUrl, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Post failed:', errorData);
      throw new Error(errorData.message || `Post failed: ${response.status}`);
    }

    const responseData = await response.json();

    postForm.reset();

    alert('✅ Post published successfully!');
    window.location.href = '../post/manage.html';
  } catch (error) {
    console.error('Post creation error:', error);
    alert(`Failed to publish post: ${error.message}`);
  } finally {
    loader.style.display = 'none';
  }
}

imageUrlInput.addEventListener('input', () => {
  const url = imageUrlInput.value.trim();

  if (url) {
    postContainer.style.backgroundImage = `url('${url}')`;
    postContainer.style.backgroundSize = 'cover';
    postContainer.style.backgroundPosition = 'center';
    postContainer.style.backgroundRepeat = 'no-repeat';
  } else {
    postContainer.style.backgroundImage = '';
  }
});
