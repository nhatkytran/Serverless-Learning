const students = require('../assets/students');

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(students),
  };
};
