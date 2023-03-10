const express = require("express");
const { firebaseApp, db } = require("./firebase/firebase");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} = require("firebase/auth");
const cors = require("cors");
const Cryptr = require("cryptr");
const { addDoc, collection, getDocs } = require("firebase/firestore");

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

app.post("/api/generate", (req, res) => {
  const size = req.body.size;
  const password = generatePassword(size);
  res.json({
    password: password
  });
});
function generatePassword(size) {
  let password = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  for (let i = 0; i < size; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
}
app.post("/api/save", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const domain = req.body.domain;
  const crypt = new Cryptr(req.body.master);
  const encryptedPassword = crypt.encrypt(password);
  try {
    await addDoc(collection(db, "passwords"), {
      email: email,
      password: encryptedPassword,
      domain: domain
    });
    res.json({
      status: "success"
    });
  } catch (e) {
    res.json({
      status: "error",
      error: e.message
    });
  }
});
app.post("/api/get", async (req, res) => {
  const query = req.body.query;
  const data = [];
  try {
    const querySnapshot = await getDocs(collection(db, "passwords"));
    querySnapshot.forEach((doc) => {
      if (doc.data().domain.includes(query.toLowerCase())) {
        data.push({ id: doc.id, ...doc.data() });
      }
    });
    res.json({
      status: "success",
      data: data
    });
  } catch (err) {
    res.json({
      status: "error",
      error: err.message
    });
  }
});

app.post("/api/decrypt", async (req, res) => {
  const { id, master } = req.body;
  try {
    const querySnapshot = await getDocs(collection(db, "passwords"));
    querySnapshot.forEach((doc) => {
      if (doc.id == id) {
        const crypt = new Cryptr(master);
        const decryptedPassword = crypt.decrypt(doc.data().password);
        res.json({
          status: "success",
          password: decryptedPassword
        });
      }
    });
  } catch (err) {
    res.json({
      status: "error",
      error: err.message
    });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
