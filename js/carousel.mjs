import { createHTML } from './utils.mjs';

const carouselContentEl = document.querySelector('#carousel-content-el');

let currentIndex = 0;
let latestPosts = [];

function createCarouselEl({ id, title, media }) {
  const detailsUrl = `/single/index?id=${id}`;
  const imageUrl =
    media?.url || 'https://via.placeholder.com/600x400?text=No+Image';
  const altText = media?.alt || 'Blog post image';

  return `
    <a href="${detailsUrl}" class="img-container">
      <img src="${imageUrl}" alt="${altText}" class="slider-img fade first-img">
      <div class="carousel-title-div">
        <h2>${title || 'Untitled Post'}</h2>
      </div>
    </a>`;
}

function updateCarousel() {
  if (!carouselContentEl) return;
  carouselContentEl.innerHTML = '';
  const post = latestPosts[currentIndex];
  if (!post) return;
  const template = createCarouselEl(post);
  const element = createHTML(template);
  carouselContentEl.append(element);
}

function handleScroll(direction) {
  currentIndex =
    (currentIndex + direction + latestPosts.length) % latestPosts.length;
  updateCarousel();
}

export function setupCarousel(posts) {
  if (!Array.isArray(posts) || posts.length === 0) return;

  latestPosts = posts
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .slice(7, 10);

  const prevButton = document.querySelector('#prev');
  const nextButton = document.querySelector('#next');

  prevButton?.addEventListener('click', () => handleScroll(-1));
  nextButton?.addEventListener('click', () => handleScroll(1));

  updateCarousel();
}
