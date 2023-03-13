require("dotenv").config();
const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const File = require("./models/File");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const error = file ? null : new Error("No File");
    cb(error, "uploads");
  },
  filename: function (req, file, cb) {
    const error = file ? null : new Error("No File");
    cb(error, Date.now() + file.originalname);
    // cb(error, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000000000 },
}).single("file");

app.post("/upload", async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    const fileData = {
      path: req.file.path,
      originalName: req.file.originalname,
    };
    if (req.body.password != null && req.body.password !== "") {
      fileData.password = await bcrypt.hash(req.body.password, 10);
    }
    const file = await File.create(fileData);
    // res.send({ fileLink: `${req.headers.origin}/file/${file.id}` });
    res.send({ fileLink: `http://localhost:8000/download/${file.id}` });
  });
});

// app.route("/file/:id").get(handleDownload).post(handleDownload);
// // app.route("/file/:id").get(handleDownload);

// async function handleDownload(req, res) {
//   console.log("file download attempt");
//   const file = await File.findById(req.params.id);
//   console.log(req.params.id, req.body.password);
//   if (file.password !== null) {
//     if (req.body.password == null) {
//       res.status(401).send({ message: "Password is required to access file." });
//     }
//     if (!(await bcrypt.compare(req.body.password, file.password))) {
//       console.log("wrong");
//       res.status(401).send({ message: "Incorrect password provided." });
//       return;
//     }
//   }

//   file.downloadCount++;
//   await file.save();
//   console.log("success", file.downloadCount);

//   res.download(file.path, file.originalName);
//   // res.status(200).send("HELLO");
// }

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

app.route("/file/:id").post(handleDownload);
// app.route("/file/:id").get(handleDownload);
app.route("/download/:id").get(handleDow);

async function handleDownload(req, res) {
  console.log("file download attempt");
  const file = await File.findById(req.params.id);
  console.log(req.params.id, req.body.password);
  if (file.password !== null) {
    if (req.body.password == null) {
      res.status(401).send({ message: "Password is required to access file." });
    }
    if (!(await bcrypt.compare(req.body.password, file.password))) {
      console.log("wrong");
      res.status(401).send({ message: "Incorrect password provided." });
      return;
    }
  }

  // file.downloadCount++;
  // await file.save();
  // console.log("success", file.downloadCount);

  // res.download(file.path, file.originalName);
  res.status(200).send("success!");
}

async function handleDow(req, res) {
  console.log("file download attempt");
  const file = await File.findById(req.params.id);

  file.downloadCount++;
  await file.save();
  console.log("success", file.downloadCount);

  res.download(file.path, file.originalName);
  // res.status(200).send("HELLO");
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
