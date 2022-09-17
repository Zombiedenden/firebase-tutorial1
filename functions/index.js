const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);
admin.initializeApp(functions.firebaseConfig());

// Listens for new messages added to
//  /products/:documentId/name and creates a
//  message to /products/:documentId/message
exports.sendMessage = functions.firestore
    .document("products/{documentId}")
    .onCreate((snap, context) => {
      const name = snap.data().name;
      const docId = context.params.documentId;
      functions.logger.log("Adding a message", docId, name);
      const myMessage = `Nice ${name}! - Love Cloud Functions`;
      return snap.ref.set({myMessage}, {merge: true});
    });
