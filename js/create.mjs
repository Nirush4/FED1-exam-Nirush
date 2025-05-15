import { displayUserNav } from './manage.mjs';

const postForm = document.querySelector('#postForm');
const titleInput = document.querySelector('#title');
const contentInput = document.querySelector('#content');
const imageUrlInput = document.querySelector('#imageUrl');
const imageAltInput = document.querySelector('#imageAlt');
const tagsInput = document.querySelector('#tags');
const messageDiv = document.querySelector('#message');

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
      throw new Error(`Post failed: ${response.status}`);
    }

    const responseData = await response.json();

    postForm.reset();
    messageDiv.textContent = 'Post published successfully!';

    if (username) {
      window.location.href = '../post/manage.html';
    } else {
      window.location.href = './index.html';
    }
  } catch (error) {
    console.error('Post creation error:', error);
    alert('Failed to publish post. Please check your input or login token.');
  } finally {
    loader.style.display = 'none';
  }
}
