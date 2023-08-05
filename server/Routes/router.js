const express = require("express");
const router = new express.Router();
const con = require("../dbConfig/dbConfig");
const multer = require("multer");
const moment = require("moment");
const conn = require("../dbConfig/dbConfig");

//Image storage configuration

const imgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}-${file.originalname}`);
  },
});

//Image filter
const imgFilter = (req, file, callback, error) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, error);
  }
};

//Upload config
const upload = multer({
  storage: imgConfig,
  fileFilter: imgFilter,
});

//Registor in API
router.post("/registor", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(422).json({ status: 422, message: "Fill the data" });
  }
  try {
    let date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const regis = `INSERT INTO userdetail (username, email, password, date) VALUES ("${username}","${email}","${password}","${date}")`;
    con.query(regis, (err, result) => {
      if (err) {
        throw err;
      } else {
        return res.status(201).json({ status: 201, data: req.body });
      }
    });
  } catch (error) {
    return res.status(404).json({ status: 404, error });
  }
});

//Login Api
router.post(`/login`, (req, res) => {
  const { username, password } = req.body;
  try {
    const qr = `SELECT * FROM userdetail WHERE username="${username}" AND password="${password}"`;
    con.query(qr, (err, result) => {
      if (err) {
        throw err;
      } else {
        if (result.length > 0) {
          return res.status(201).json({ status: 201, data: req.body });
        } else {
          // eslint-disable-next-line no-self-compare
          if (username !== result.username || password !== result.password) {
            console.log("router username password not match");
          }
        }
      }
    });
  } catch (error) {
    return res.status(404).json({ status: 404, error });
  }
});

module.exports = router;
