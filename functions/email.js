require('dotenv').config();
const nodemailer = require('nodemailer');

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;

exports.handler = async function (event) {
  const method = event.httpMethod;

  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Only Post requests allowed',
    };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: 'Please fill in the form completely',
      };
    }

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: 'nhockkutean2@gmail.com', // sender address
      to: `${name} <${email}>`, // list of receivers
      subject: `${subject}`, // Subject line
      html: `<p>${message}</p>`,
    };

    await transporter.sendMail({ ...mailOptions });

    return {
      statusCode: 200,
      body: 'Success',
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: 'Something went wrong',
    };
  }
};
