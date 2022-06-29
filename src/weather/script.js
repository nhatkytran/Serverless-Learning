'use strict';

const form = document.querySelector('form');
const input = document.querySelector('input');
const errorElement = document.querySelector('p');
const result = document.querySelector('.result');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const city = input.value;

  if (!city) return;

  getWeather(city);
});

async function getWeather(city) {
  try {
    errorElement.style.display = 'none';

    const { data } = await axios.post('/api/weather', { city });
    const markup = `
      <div>${data.name}</div>
      <span>Feels like: ${data.feelsLike}℃</span>
    `;

    result.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    console.error('Something went wrong!');
    console.log(error);
    result.innerHTML = '';
    errorElement.style.display = 'block';
    errorElement.textContent = error.message;
  }
}
