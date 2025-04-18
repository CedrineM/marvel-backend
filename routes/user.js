//import des packages requis
const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

//importation des modèles requis
const User = require("../models/User");

//Create
//POST ==> route pour creer un compte utilisateur (sign up)
router.post("/user/signup", async (req, res) => {
  try {
    // console.log(req.body);

    if (!req.body.username) {
      throw { message: "You must enter a username ", status: 400 };
    }
    if (await User.findOne({ email: req.body.email })) {
      throw { message: "This account already exists", status: 409 };
    }

    //génération d'un salt
    const newSalt = uid2(16);

    //génération d'un token
    const newToken = uid2(64);

    //concaténation du password+salt - et création du hash
    const newHash = SHA256(req.body.password + newSalt).toString(encBase64);

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      token: newToken,
      hash: newHash,
      salt: newSalt,
    });

    // console.log(newUser);
    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      token: newUser.token,
      username: newUser.username,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Internal server Error",
    });
  }
});

//POST ==> route pour se connecter à un compte utilisateur (log in)
router.post("/user/login", async (req, res) => {
  try {
    // console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    //Est ce que les informations communiquer sont correct
    if (!user) {
      throw {
        message: "The information communicated are not correct ",
        status: 401,
      };
    }
    const hashReq = SHA256(req.body.password + user.salt).toString(encBase64);
    if (hashReq !== user.hash) {
      throw {
        message: "The information communicated are not correct ",
        status: 401,
      };
    }
    return res.status(202).json({
      _id: user._id,
      token: user.token,
      username: user.username,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Internal server Error",
    });
  }
});

//Read

//Update

//Delete

//Exportation des routes
module.exports = router;
