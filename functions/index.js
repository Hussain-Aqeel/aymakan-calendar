// Firebase config
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require("cors")({
  origin: true
});

admin.initializeApp();

exports.emailMessage = functions.https.onCall((req, res) => {
  return cors(req, res, async() => {
    console.log(req);
    console.log(res);
  })
});