//importation des packages requis
const mongoose = require("mongoose");

//création du modèle
const User = mongoose.model("User", {
  email: String,
  username: String,
  token: String,
  hash: String,
  salt: String,
});

// exportation du modèle
module.exports = User;
