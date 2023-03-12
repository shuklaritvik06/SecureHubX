const express = require("express");
const { firebaseApp, db } = require("./firebase/firebase");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} = require("firebase/auth");
const cors = require("cors");
const ChartJsImage = require("chartjs-to-image");
const { Axios } = require("axios");
const axios = new Axios({});
const Cryptr = require("cryptr");
const { addDoc, collection, getDocs } = require("firebase/firestore");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { Configuration, OpenAIApi } = require("openai");

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

function getCommits(data) {
  const commits = [0, 0, 0, 0, 0, 0, 0];
  data = JSON.parse(data);
  data.forEach((item) => {
    if (item[2] > commits[item[0]]) {
      commits[item[0]] = item[2];
    }
  });
  return commits;
}
async function main(email, chart, repo) {
  const message = `Hi,
    <br><br>
    Check out this weeks stats:
    <br><br>
    <img src="${await chart.getUrl()}" />
`;
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: `${process.env.MYMAIL}`,
        pass: `${process.env.PASS}`
      }
    })
  );

  const mailOptions = {
    from: `${process.env.MYMAIL}`,
    to: `${email}`,
    subject: "Weekly Stats",
    html: message
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
app.post("/api/github", (req, res) => {
  const chart = new ChartJsImage();
  const { username, repo, email } = req.body;
  const url = `https://api.github.com/repos/${username}/${repo}/stats/punch_card`;
  axios.get(url).then(async (data) => {
    const dat = getCommits(data.data);
    chart.setConfig({
      type: "line",
      data: {
        labels: ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"],
        datasets: [{ label: "Week Stats", data: dat }]
      }
    });
    await main(email, chart, repo);
  });
  res.json({
    status: "success"
  });
});
app.post("/api/email", async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration);
  const { from, by, description } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 10,
    prompt: `Write a email to ${from} by ${by} for ${description}`
  });
  res.json({
    status: "success",
    email: completion.data.choices[0].text
  });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
