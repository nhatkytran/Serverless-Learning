const students = require('../assets/students');

exports.handler = async function () {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: JSON.stringify(students),
  };
};
