const students = [
  {
    name: 'Frlix',
    age: 20,
  },
  {
    name: 'Ky',
    age: 20,
  },
];

exports.handler = async function (event, context) {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: JSON.stringify(students),
  };
};
