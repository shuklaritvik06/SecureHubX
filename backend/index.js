const express = require("express");
const firebaseApp = require("./firebase/firebase");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} = require("firebase/auth");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.post("/api/auth/login", (req, res) => {
  const auth = getAuth(firebaseApp);
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      res.json({
        status: "success",
        userCredential: userCredential
      });
    })
    .catch((error) => {
      res.json({
        status: "error",
        error: error.message
      });
    });
});
app.post("/api/auth/register", (req, res) => {
  const auth = getAuth(firebaseApp);
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      res.json({
        status: "success",
        userCredential: userCredential
      });
    })
    .catch((error) => {
      res.json({
        status: "error",
        error: error.message
      });
    });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
