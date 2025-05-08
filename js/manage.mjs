export function fetchToken() {
  return localStorage.getItem('userToken');
}

export function displayUserNav(enteredName) {
  const navLinks = document.querySelector('#log-in');

  if (navLinks) {
    if (enteredName) {
      navLinks.innerHTML = `Hello, <span class="user-name">${enteredName}</span>`;
    } else {
      navLinks.innerHTML = `<a href="../account/login.html">Login</a> | <a href="../account/register.html">Sign Up</a>`;
    }

    const logoutBtn = document.querySelector('#log-out');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', handleLogout);
    }
  }
}

export function userIsLoggedIn() {
  const token = fetchToken();
  return token !== null;
}

export function handleLogout() {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userName');
}

export function initLoginCheck() {
  const name = localStorage.getItem('userName');
  displayUserNav(name);
}

document.addEventListener('DOMContentLoaded', () => {
  initLoginCheck();
});
