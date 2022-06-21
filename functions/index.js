// Firebase config
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const sgMail = require('@sendgrid/mail');

admin.initializeApp();

const {
  VUE_APP_API_KEY,
  VUE_APP_TEMPLATE_ID
} = process.env

sgMail.setApiKey(VUE_APP_API_KEY);

const confirmationEmail = functions.https.onCall(async (request, response) => {

  const msg = {
    to: request.email,
    from: 'h.aljassim.1999@gmail.com',
    templateId: VUE_APP_TEMPLATE_ID,
    dynamic_template_data: {
      subject: request.subject,
      name: request.name,
      email: request.email,
      room: request.room,
      title: request.title,
      description: request.description,
    }
  }

  await sgMail.send(msg);

  console.log(response)

  return { success: true };

});

module.exports = { confirmationEmail };