import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loginForm = document.querySelector('.login-form');

function isLocalStorageSupported() {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

function saveFormDataToLocalStorage(formData) {
  if (isLocalStorageSupported()) {
    localStorage.setItem('formData', JSON.stringify(formData));
  } else {
    console.error('Local storage is not supported in this browser.');
  }
}

function getFormDataFromLocalStorage() {
  if (isLocalStorageSupported()) {
    const formDataJSON = localStorage.getItem('formData');
    return formDataJSON ? JSON.parse(formDataJSON) : null;
  } else {
    console.error('Local storage is not supported in this browser.');
    return null;
  }
}

window.addEventListener('DOMContentLoaded', function () {
  const savedFormData = getFormDataFromLocalStorage();
  if (savedFormData) {
    const emailInput = loginForm.elements.email;
    const passwordInput = loginForm.elements.password;

    emailInput.value = savedFormData.email;
    passwordInput.value = savedFormData.password;
  }
});

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const emailInput = this.elements.email;
  const passwordInput = this.elements.password;

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (!emailValue || !passwordValue) {
    alert('All form fields must be filled in');
    return;
  }

  const formData = {
    email: emailValue,
    password: passwordValue
  };

  console.log(formData);

  saveFormDataToLocalStorage(formData);

  this.reset();
});
