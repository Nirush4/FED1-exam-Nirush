import { logInEndPoint } from './utils.mjs';
import { displayUserNav } from './manage.mjs';

const loginForm = document.querySelector('#login-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const loader = document.getElementById('loader'); // Loader element reference

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  loader.style.display = 'flex';

  setTimeout(() => {
    handleLogin();
  }, 2000);

  async function handleLogin() {
    const enteredName = nameInput.value.trim();
    const enteredEmail = emailInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    if (!enteredEmail || !enteredPassword || !enteredName) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
        }),
      };

      const response = await fetch(logInEndPoint, requestOptions);

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }

      const responseData = await response.json();

      sessionStorage.setItem('userToken', responseData.data.accessToken);
      sessionStorage.setItem('userName', enteredName);

      displayUserNav(enteredName);

      if (enteredName === 'Nirush') {
        window.location.href = '../post/manage.html';
      } else {
        window.location.href = './login.html';
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Could not log in. Please check your email and password.');
    } finally {
      loader.style.display = 'none';
    }
  }
});
