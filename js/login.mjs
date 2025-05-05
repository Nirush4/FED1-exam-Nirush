import { logInEndPoint } from './utils.mjs';

const loginForm = document.querySelector('#login-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  handleLogin();

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

      localStorage.setItem('userToken', responseData.data.accessToken);
      localStorage.setItem('userName', enteredName);

      if (enteredName === 'Nirush') {
        window.location.href = '../post/manage.html';
      } else {
        window.location.href = '../index.html';
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Could not log in. Please check your email and password.');
    } finally {
      // Optional: hide loading spinner here if you add one
      // hideLoader();
    }
  }
});
