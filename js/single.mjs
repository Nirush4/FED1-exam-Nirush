const params = new URLSearchParams(window.location.search);
const postId = params.get('id');

const authorName = 'Nirush';
const singlePostContainer = document.querySelector('#singe-post-container');

const apiUrl = `https://v2.api.noroff.dev/blog/posts/${authorName}/${postId}`;

fetchSinglePost();

async function fetchSinglePost() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Post not found');
    const { data: post } = await response.json();

    renderPost(post);
  } catch (error) {
    console.error('Error loading post:', error);
    document.querySelector(
      'main'
    ).innerHTML = `<p>Post could not be loaded.</p>`;
  }
}

function renderPost(post) {
  const postHTML = `    
    <section class="hero-section-div">
    <div class="img-div">
    <img id="post-image" src="${
      post.media?.url || '/image/home/hero-img.jpg'
    }" alt="${post.media?.alt || 'Blog post image'}">
    </div>
    </section>
    
    <section class="content-div">
    <h2 id="post-title">${post.title || 'Testing'}</h2>
    <div class="blog-content">
    <p id="post-body">${
      post.body ||
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda expedita quia dolores nihil hic labore consectetur perferendis mollitia eveniet dolor fugit eaque veritatis ducimus, id explicabo aspernatur sunt tempore, quam debitis iure atque non.'
    }</p>
    <div class="published-author">
    <span id="post-author">Author: ${post.author?.name || 'Nirush'}</span>
    <span id="post-date">Published on: ${
      new Date(post.created).toLocaleDateString('en-GB') || '03.04.2025'
    }</span>
    </div>
    </div>
    </section>
    `;

  singlePostContainer.innerHTML = postHTML;
}
