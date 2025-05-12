const API = 'https://v2.api.noroff.dev';

export const registerEndPoint = `${API}/auth/register`;
export const logInEndPoint = `${API}/auth/login`;

export function createHTML(template) {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(template, 'text/html');
  return parsedDocument.body.firstChild;
}

export function clearNode(el) {
  removeAllChildNodes(el);
}
