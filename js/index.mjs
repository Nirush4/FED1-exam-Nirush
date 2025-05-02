import { createHTML } from './utils.mjs';
import { setupCarousel } from './carousel.mjs';

const containerEl = document.querySelector('#blog-container');

const fetchblogs = 'https://v2.api.noroff.dev/blog/posts/Nirush/';

let allPosts = [];

fetchPosts();

export async function fetchPosts() {
  try {
    const response = await fetch(fetchblogs);
    if (!response.ok) throw new Error('Error fetching blog posts');
    const data = await response.json();
    allPosts = data.data;
    setupCarousel(allPosts);
    createPostListEl(allPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

function blogPostTemplate({ id, title, body, media }) {
  const detailsUrl = `/single/index?id=${id}`;
  const trimmedBody = body.length > 100 ? body.slice(0, 100) + '...' : body;

  return `
    <a href="${detailsUrl}" class="blog-list" aria-label="View post titled ${title}">
      <img src="${media?.url}" alt="${media?.alt || 'Blog post image'}">
      <h3>${title}</h3>
      <p>${trimmedBody}</p>
      <button aria-label="Read more about ${title}">Learn more...</button>
    </a>
  `;
}

function createPostListEl(list = []) {
  if (!containerEl) {
    console.error('Missing container element');
    return;
  }

  list.forEach((post) => {
    const template = blogPostTemplate(post);
    const newEl = createHTML(template);
    containerEl.append(newEl);
  });
}
