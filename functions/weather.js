require('dotenv').config();
const { default: axios } = require('axios');

const url = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.WEATHER_API_KEY_PRIVATE}&units=metric&q=`;

exports.handler = async function (event) {
  const method = event.httpMethod;

  if (method === 'GET') {
    return {
      statusCode: 405,
      body: 'Only GET method allowed',
    };
  }

  try {
    const { city } = JSON.parse(event.body);
    console.log(city);

    if (!city) throw new Error();

    const { data } = await axios.get(`${url}${city}`);
    const name = data.name;
    const feelsLike = data.sys.country;

    return {
      statusCode: 200,
      body: JSON.stringify({ name, feelsLike }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.cod,
      body: error.message,
    };
  }
};
