//import des packages requis
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//connection à la base de donnée
mongoose.connect(process.env.MONGODB_URI);

//création du serveur express
const app = express();
app.use(express.json());

//autorisation des demandes extérieur
app.use(cors());

//importation des différente routes
const routerCharacters = require("./routes/characters.js");
app.use(routerCharacters);

const routerComics = require("./routes/comics.js");
app.use(routerComics);

const routerUser = require("./routes/user.js");
app.use(routerUser);

const routerFavorite = require("./routes/favorite.js");
app.use(routerFavorite);

//route d'acceuil
app.get("/", (req, res) => {
  try {
    return res.status(200).json({ message: "Welcome to the Marvel Universe!" });
  } catch (error) {
    console.error;
    return res.status(500).json({ message: "Internal server Error" });
  }
});

//Tous les chemins non existant
app.all("*", (req, res) => {
  return res.status(404).json({ message: "This page does not exist" });
});

//mise en ligne du serveur (ecoute)
app.listen(process.env.PORT, () => {
  console.log("Server started 🦸🏼");
});
