// const siderBar = document.querySelectorAll('.img-container');
// const prevButton = document.getElementById('prev');
// const nextButton = document.getElementById('next');

// let index = 0;
// const interval = 5000;

// const hideAll = () => {
//   siderBar.forEach((slide) => {
//     slide.style.display = 'none';
//   });
// };

// const nextSlide = () => {
//   hideAll();
//   siderBar[index].style.display = 'block';
//   index++;

//   if (index === siderBar.length) {
//     index = 0;
//   }
// };

// const prevSlide = () => {
//   hideAll();
//   siderBar[index].style.display = 'block';
//   index--;

//   if (index < 0) {
//     index = siderBar.length - 1;
//   }
// };

// nextSlide();

// const changeSlide = setInterval(nextSlide, interval);

// prevButton.addEventListener('click', () => {
//   clearInterval(changeSlide);
//   prevSlide();
// });

// nextButton.addEventListener('click', () => {
//   clearInterval(changeSlide);
//   nextSlide();
// });

import { createHTML } from './utils.mjs';

const carouselContainerEl = document.querySelector('#carousel-container-el');
let currentIndex = 0;
let latestPosts = [];

// Create the HTML template for one carousel post
function createCarouselEl({ id, title, media }) {
  const detailsUrl = `/single/index?id=${id}`;
  const imageUrl =
    media?.url || 'https://via.placeholder.com/600x400?text=No+Image';
  const altText = media?.alt || 'Blog post image';

  return `
    <a href="${detailsUrl}" class="img-container">
      <img src="${imageUrl}" alt="${altText}" class="slider-img fade">
      <div class="carousel-title-div">
        <h2>${title || 'Untitled Post'}</h2>
      </div>
    </a>`;
}

// Render the current carousel post based on index
function updateCarousel() {
  if (!carouselContainerEl) return;

  carouselContainerEl.innerHTML = ''; // Clear previous content
  const post = latestPosts[currentIndex];
  if (!post) return;

  const template = createCarouselEl(post);
  const element = createHTML(template);
  carouselContainerEl.append(element);
}

// Event handlers for carousel scroll
function handleScroll(direction) {
  currentIndex =
    (currentIndex + direction + latestPosts.length) % latestPosts.length;
  updateCarousel();
}

// Setup the carousel system
export function setupCarousel(posts) {
  if (!Array.isArray(posts) || posts.length === 0) return;

  latestPosts = posts
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .slice(0, 3);

  const prevButton = document.querySelector('#prev');
  const nextButton = document.querySelector('#next');

  prevButton?.addEventListener('click', () => handleScroll(-1));
  nextButton?.addEventListener('click', () => handleScroll(1));

  updateCarousel();
}
