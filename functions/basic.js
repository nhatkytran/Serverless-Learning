const students = require('../assets/students');

exports.handler = async function (event, context) {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: JSON.stringify(students),
  };
};
