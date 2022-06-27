'use strict';

const airtitem = document.querySelector('.airtitem');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const fetchAPI = async function () {
  try {
    const { data } = await axios.get(`/api/airtable?id=${id}`);
    const { name, Date: birth, desc, images } = data.fields;
    const { url: image } = images[0];
    const markup = `
      <img src=${image} alt=${name} />
      <div class="info">
        <div class="name">${name}</div>
        <p class="date">${birth}</p>
        <p class="desc">${desc}</p>
      </div>
    `;

    airtitem.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    console.error('Something went wrong!');
    console.log(error);
    airtitem.insertAdjacentHTML('beforeend', `<h3>${error.message}</h3>`);
  }
};

fetchAPI();
