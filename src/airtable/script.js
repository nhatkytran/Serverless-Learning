'use strict';

const { body } = document;

const fetchAPI = async function () {
  try {
    const { data } = await axios.get('/api/airtable');
    const markup = data
      .map(data => {
        return `
        <a href="airtitem.html?id=${data.id}">
          <img src="${data.image}" alt="${data.name}" />
          <div class="info">
            <div>${data.name}</div>
            <p>${data.birth}</p>
          </div>
        </a>
      `;
      })
      .join('');

    body.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.log('Something went wrong!');
    console.log(error);
    body.insertAdjacentHTML('beforeend', `<h3>${error.message}</h3>`);
  }
};

fetchAPI();
