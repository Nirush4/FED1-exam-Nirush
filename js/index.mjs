import { createHTML } from './utils.mjs';
import { setupCarousel } from './carousel.mjs';

const containerEl = document.querySelector('#blog-container');
const sortFilterEl = document.getElementById('sort-filter');
const sortTitleEl = document.getElementById('sort-title');
const searchBarEl = document.getElementById('search-bar');

const fetchblogs = 'https://v2.api.noroff.dev/blog/posts/Nirush/';
let allPosts = [];
let currentPage = 1;
const postsPerPage = 9;
let filteredPosts = [];

const paginationContainer = document.createElement('div');
paginationContainer.id = 'pagination-container';

const prevButton = document.createElement('button');
prevButton.classList.add('pagination-btn');
prevButton.id = 'prev-btn';
prevButton.innerHTML = '&laquo; Previous';
prevButton.disabled = true;

const pageNumberSpan = document.createElement('span');
pageNumberSpan.id = 'page-number';
pageNumberSpan.textContent = 'Page 1 of 1';

const nextButton = document.createElement('button');
nextButton.classList.add('pagination-btn');
nextButton.id = 'next-btn';
nextButton.innerHTML = 'Next &raquo;';

paginationContainer.append(prevButton, pageNumberSpan, nextButton);
document.body.appendChild(paginationContainer);

fetchPosts();

export async function fetchPosts() {
  try {
    const response = await fetch(fetchblogs);
    if (!response.ok) throw new Error('Error fetching blog posts');
    const data = await response.json();
    allPosts = data.data;

    setupCarousel(allPosts);
    handleFilters();
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

  containerEl.innerHTML = '';

  if (list.length === 0) {
    containerEl.innerHTML = '<p>No results found.</p>';
    return;
  }

  list.forEach((post) => {
    const template = blogPostTemplate(post);
    const newEl = createHTML(template);
    containerEl.append(newEl);
  });

  updatePaginationButtons();
}

function handleFilters() {
  const searchFilter = searchBarEl.value.toLowerCase();
  filteredPosts = [...allPosts];

  if (searchFilter) {
    filteredPosts = filteredPosts.filter((post) =>
      post.title.toLowerCase().includes(searchFilter)
    );
  }

  filteredPosts = filteredPosts.filter(
    (post) => post.created && !isNaN(new Date(post.created).getTime())
  );

  const dateSortValue = sortFilterEl.value;
  if (dateSortValue === 'latest') {
    filteredPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
  } else if (dateSortValue === 'oldest') {
    filteredPosts.sort((a, b) => new Date(a.created) - new Date(b.created));
  }

  const titleSortValue = sortTitleEl.value;
  if (titleSortValue === 'title-asc') {
    filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (titleSortValue === 'title-desc') {
    filteredPosts.sort((a, b) => b.title.localeCompare(a.title));
  }

  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  createPostListEl(paginatedPosts);
}

function updatePaginationButtons() {
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const pageNumberEl = document.getElementById('page-number');
  pageNumberEl.textContent = `Page ${currentPage} of ${totalPages}`;

  const prevButton = document.getElementById('prev-btn');
  prevButton.disabled = currentPage === 1;

  const nextButton = document.getElementById('next-btn');
  nextButton.disabled = currentPage === totalPages;
}

sortFilterEl.addEventListener('change', handleFilters);
sortTitleEl.addEventListener('change', handleFilters);
searchBarEl.addEventListener('input', handleFilters);

document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    handleFilters();
  }
});

document.getElementById('next-btn').addEventListener('click', () => {
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    handleFilters();
  }
});
