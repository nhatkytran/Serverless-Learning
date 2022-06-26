'use strict';

const fetchAPI = async function () {
  try {
    const response = await axios.get('/.netlify/functions/first');
    console.log(response);
  } catch (error) {
    console.log(error.message);
    console.log(error);
  }
};

fetchAPI();
