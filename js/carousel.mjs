import { createHTML } from './utils.mjs';

const carouselContentEl = document.querySelector('#carousel-content-el');

let currentIndex = 0;
let latestPosts = [];

function createCarouselEl({ id, title, media }) {
  const detailsUrl = `/post/single.html?id=${id}`;

  let imageUrl;
  if (media && media.url) {
    imageUrl = media.url;
  } else {
    imageUrl =
      'https://images.unsplash.com/photo-1548502499-ef49e8cf98d4?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  }

  const altText = media?.alt || 'Blog post image';

  return `
    <a href="${detailsUrl}" class="img-container">
      <img src="${imageUrl}" alt="${altText}" class="slider-img fade first-img">
      <div class="carousel-title-div">
        <button class="read-more">Read more</button>
        <h2>${title || 'Untitled Post'}</h2>
      </div>
    </a>
  `;
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
  if (!latestPosts.length) return;

  currentIndex =
    (currentIndex + direction + latestPosts.length) % latestPosts.length;
  updateCarousel();
}

export function setupCarousel(posts) {
  if (!Array.isArray(posts) || posts.length === 0) return;

  // ✅ Use the latest 3 posts instead of slicing from index 7
  latestPosts = posts
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .slice(0, 3);

  const prevButton = document.querySelector('#prev');
  const nextButton = document.querySelector('#next');

  if (prevButton) {
    prevButton.addEventListener('click', () => handleScroll(-1));
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => handleScroll(1));
  }

  updateCarousel();
}
