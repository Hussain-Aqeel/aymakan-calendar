// Firebase config
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();


const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;


sgMail.setApiKey(API_KEY);

exports.createReservation = functions.firestore
  .document('reservations/{reservationId}')
  .onCreate((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = snap.data();

    const reservationId = context.params.reservationId;

    const msg = {
      to: newValue.email,
      from: 'h.aljassim@aymakan.com.sa',
      templateId: TEMPLATE_ID,
      dynamic_template_data: {
        subject: `Thank you ${newValue.name}, your reservation is confirmed.`,
        name: newValue.name,
        email: newValue.email,
        room: newValue.room,
        title: newValue.meeting_title,
        description: newValue.meeting_desc,
        date: newValue.date,
        time: newValue.slots,
        reservationURL: newValue.baseUrl + reservationId,
      }
    }
    
    return sgMail.send(msg);
  });
