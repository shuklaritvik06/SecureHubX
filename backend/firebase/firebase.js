const { initializeApp } = require("firebase/app");
const { config } = require("../config/config");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
module.exports = {
  firebaseApp,
  db
};
