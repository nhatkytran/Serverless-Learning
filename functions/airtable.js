require('dotenv').config();
const Airtable = require('airtable-node');
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appfQvnlfEHZriB1Z')
  .table('Serverless');

exports.handler = async function (event) {
  const { id } = event.queryStringParameters;

  if (id) {
    try {
      const data = await airtable.retrieve(id);

      if (data.error) throw new Error('Something went wrong');

      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      console.error('Something went wrong!');
      console.log(error);
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 400,
        body: error.message,
      };
    }
  }

  if (!id) {
    try {
      const { records } = await airtable.list();
      const data = records.map(item => {
        const {
          id,
          fields: { name, Date: birth, images },
        } = item;
        const { url: image } = images[0];

        return { id, name, birth, image };
      });

      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      console.error('Something went wrong!');
      console.log(error);
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 404,
        body: 'Something went wrong!',
      };
    }
  }
};
