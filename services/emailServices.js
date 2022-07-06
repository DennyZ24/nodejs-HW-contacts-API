const sgMail = require('@sendgrid/mail');
const { createError } = require('../helpers/createErrors');

require('dotenv').config();
const {PORT, SEND_GRID_KEY} = process.env;

const sendEmail = async (userEmail, verifyCode) => { 
  sgMail.setApiKey(SEND_GRID_KEY);
  const link = `http://localhost:${PORT}/users/verify/${verifyCode}`

const msg = {
  to: userEmail, 
  from: 'dzapara24@gmail.com', 
  subject: 'Confirm your email',
  html: `<h3>Click on this link to confirm email ${link}</h3>`,
}
 
  try {
    await sgMail.send(msg)

  } catch (e) {
    throw createError(e.message);
  }
};

module.exports = { sendEmail };