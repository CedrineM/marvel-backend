//importation des packages requis
const mongoose = require("mongoose");

//création du modèle
const User = mongoose.model("User", {
  email: { type: String, required: true },
  username: { type: String, required: true },
  token: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

// exportation du modèle
module.exports = User;
