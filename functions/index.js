const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
// const db = admin.firestore();

// sendGrid config 
const sgMail = require('@sendgrid/mail');

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;

sgMail.setApiKey(API_KEY);

export const sendEmail = functions.https.onCall(async (data, context) => {
  
  console.log(context.rawRequest.body);
  
  const msg = {
    to: data.email,
    from: 'h.aljassim.1999@gmail.com',
    templateId: TEMPLATE_ID,
    dynamic_template_data: {
      subject: `Thank you ${data.name}, Your reservation is confirmed`,
      name: data.name,
      title: data.title,
      room: data.room,
      description: data.description,
      date: data.date,
      time: data.time,
    }
  }

  await sgMail.send(msg);

  // error handling here

  // JSON response
  return { success: true };
})
