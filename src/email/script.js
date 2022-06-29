'use strict';

const form = document.querySelector('form');
const nameRe = document.querySelector('.name');
const email = document.querySelector('.email');
const subject = document.querySelector('.subject');
const message = document.querySelector('.message');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  sendEmail(nameRe.value, email.value, subject.value, message.value);
});

async function sendEmail(name, email, subject, message) {
  try {
    await axios.post('/api/email', { name, email, subject, message });
    console.log('Success');
  } catch (error) {
    console.error('Something went wrong!');
    console.log(error);
  }
}
