import { registerEndPoint } from './utils.mjs';
import { displayUserNav } from './manage.mjs';

const registerForm = document.querySelector('#register-form');
const nameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const loader = document.getElementById('loader');

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  loader.style.display = 'flex';

  setTimeout(() => {
    handleRegister();
  }, 2000);

  async function handleRegister() {
    const enteredName = nameInput.value.trim();
    const enteredEmail = emailInput.value.trim();
    const enteredPassword = passwordInput.value.trim();
    const enteredConfirmPassword = confirmPasswordInput.value.trim();

    if (
      !enteredEmail ||
      !enteredPassword ||
      !enteredName ||
      enteredPassword !== enteredConfirmPassword
    ) {
      alert('Please fill out all fields and make sure the passwords match.');
      loader.style.display = 'none';
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
          venueManager: true,
        }),
      };

      const response = await fetch(registerEndPoint, requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Registration failed: ${response.status}`
        );
      }

      const responseData = await response.json();

      const token =
        responseData.userToken ||
        responseData.accessToken ||
        responseData.token ||
        '';
      sessionStorage.setItem('userToken', token);
      sessionStorage.setItem('userName', enteredName);
      sessionStorage.setItem('userEmail', enteredEmail);
      sessionStorage.setItem('userId', responseData.id || '');
      sessionStorage.setItem(
        'isVenueManager',
        responseData.venueManager || false
      );

      sessionStorage.setItem('loginTime', new Date().toISOString());

      displayUserNav(enteredName);

      alert(
        'Registration successful! You will now be redirected to the login page.'
      );

      window.location.href = '../account/login.html';
    } catch (error) {
      console.error('Registration error:', error);
      alert(
        error.message ||
          'Could not register. Please check the information you entered.'
      );
    } finally {
      loader.style.display = 'none';
    }
  }
});
