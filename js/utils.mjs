const API = 'https://v2.api.noroff.dev';

export const registerEndPoint = `${API}/auth/register`;
export const logInEndPoint = `${API}/auth/login`;

const AdminName = 'Nirush';
export const BLOG_POSTS_ALL = `${API}/blog/posts/${AdminName}`;

export const getPostById = (postId) =>
  `${BASE_API_URL}/blog/posts/${registerEndPoint}/${postId}`;

export const updatePostById = (postId) =>
  `${BASE_API_URL}/blog/posts/${registerEndPoint}/${postId}`;

export const deletePostById = (postId) =>
  `${BASE_API_URL}/blog/posts/${registerEndPoint}/${postId}`;

export function createHTML(template) {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(template, 'text/html');
  return parsedDocument.body.firstChild;
}

export function clearNode(el) {
  removeAllChildNodes(el);
}
