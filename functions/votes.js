require('dotenv').config();
const Airtable = require('airtable-node');
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appfQvnlfEHZriB1Z')
  .table('LOL');

exports.handler = async function (event) {
  const { httpMethod: method } = event;

  if (method === 'GET') {
    try {
      const { records } = await airtable.list();
      const data = records.map(record => {
        const {
          id,
          fields: { name, votes },
        } = record;

        return { id, name, votes };
      });

      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      console.error('Something went wrong');
      console.log(error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    }
  }

  if (method === 'PUT') {
    try {
      let { id, votes } = JSON.parse(event.body);

      if (!id || !votes) throw new Error('Wrong data!');

      votes = Number.parseInt(votes);

      const data = await airtable.update(id, { votes });

      return {
        statusCode: 200,
        body: JSON.stringify({
          id: data.id,
          name: data.fields.name,
          votes: data.fields.votes,
        }),
      };
    } catch (error) {
      console.error('Something went wrong!');
      console.log(error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    }
  }

  return {
    statusCode: 405,
    body: 'Method not allowed!',
  };
};
