import { createHTML } from './utils.mjs';
import { setupCarousel } from './carousel.mjs';

const containerEl = document.querySelector('#blog-container');
const blogText = document.querySelector('.blog-text-div');
const sortFilterEl = document.getElementById('sort-filter');
const sortTitleEl = document.getElementById('sort-title');
const searchBarEl = document.getElementById('search-bar');
const skeletonContainer = document.getElementById(
  'carousel-skeleton-container'
);

let username = sessionStorage.getItem('userName');
if (username === null) {
  username = 'Nirush';
}

export const fetchblogs = `https://v2.api.noroff.dev/blog/posts/${username}/`;
let allPosts = [];
let currentPage = 1;
const postsPerPage = 12;
let filteredPosts = [];

fetchPosts();

export async function fetchPosts() {
  if (skeletonContainer) skeletonContainer.style.display = 'block';
  showSkeletons(12);
  try {
    const response = await fetch(fetchblogs);
    if (!response.ok) throw new Error('Error fetching blog posts');
    const data = await response.json();
    allPosts = data.data;

    setupCarousel(allPosts);
    handleFilters();
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    if (skeletonContainer) skeletonContainer.style.display = 'none';
  }
}

function showSkeletons(count) {
  containerEl.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'blog-skeleton';
    skeleton.innerHTML = `
      <div class="image"></div>
      <div class="title"></div>
      <div class="text"></div>
      <div class="button"></div>
    `;
    containerEl.appendChild(skeleton);
  }
}
function blogPostTemplate({ id, title, body, media }) {
  const detailsUrl = `/post/single.html?id=${id}`;
  const isManagePage = window.location.pathname.includes('manage');
  const trimmedBody = body.length > 100 ? body.slice(0, 100) + '...' : body;

  return `
    <a href="${detailsUrl}" class="blog-list" aria-label="View post titled ${title}" data-id="${id}">
      <img src="${media?.url}" alt="${media?.alt || 'Blog post image'}">
      <h3>${title}</h3>
      <p>${trimmedBody}</p>
      <button aria-label="Read more about ${title}">Read more...</button>

      ${
        isManagePage
          ? `
        <div id="edit-delete-div">
          <span class="edit-btn" data-id="${id}" aria-label="Edit post" role="button" tabindex="0">
            Edit <i class="fa-solid fa-pen-to-square"></i>
          </span>
          <span class="delete-btn" data-id="${id}" aria-label="Delete post" role="button" tabindex="0">
            Delete <i class="fa-solid fa-trash-can"></i>
          </span>
        </div>
        `
          : ''
      }
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
    containerEl.innerHTML = '<p class="no-post-found">No post found.</p>';
    return;
  }

  list.forEach((post) => {
    const template = blogPostTemplate(post);
    const newEl = createHTML(template);
    containerEl.append(newEl);
  });

  setupDeleteButtons();
  setupEditButtons();
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
  nextButton.addEventListener('click', () => {
    blogText.scrollIntoView();
  });
}

function setupEditButtons() {
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

function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const postId = button.dataset.id;

      const confirmDelete = confirm(
        'Are you sure you want to delete this post?'
      );
      if (!confirmDelete) return;

      try {
        const token = sessionStorage.getItem('userToken');
        const username = sessionStorage.getItem('userName');

        const response = await fetch(
          `https://v2.api.noroff.dev/blog/posts/${username}/${postId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          allPosts = allPosts.filter((post) => post.id !== postId);
          handleFilters();
        } else {
          throw new Error(`Failed to delete post. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please make sure you are logged in.');
      }
    });
  });
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
