export function fetchToken() {
  return sessionStorage.getItem('userToken');
}

export function displayUserNav(enteredName) {
  const navLinks = document.querySelector('#log-in');

  if (navLinks) {
    if (enteredName) {
      navLinks.innerHTML = `Hello, <span class="user-name">${enteredName}</span>`;
    } else {
      navLinks.innerHTML = `<a href="../account/login.html">Login</a> `;
    }

    const logoutBtn = document.querySelector('#log-out');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userName');
      });
    }
  }
}

function initLoginCheck() {
  const name = sessionStorage.getItem('userName');
  displayUserNav(name);
}

document.addEventListener('DOMContentLoaded', () => {
  initLoginCheck();
});
