//import des packages requis
const express = require("express");
const router = express.Router();
const authenticated = require("../middlewares/authenticated");
const mongoose = require("mongoose");

//importation des models
const User = require("../models/User");
const Favorite = require("../models/Favorite");

//Create
//route pour creer un favori (authentification requise)
router.post("/favorite", authenticated, async (req, res) => {
  try {
    const { itemId, type } = req.body;
    if (!itemId || !type) {
      throw {
        message:
          "You will need to provide the item ID and type to be able to add it to your favorites.",
        status: 400,
      };
    }

    const newFavorite = new Favorite({
      userId: req.id,
      type: type, // Type du favori
      itemId: itemId, // ID de l'élément à mettre en favorie
    });

    await newFavorite.save();
    res
      .status(201)
      .json({ message: `This ${type} has been added to your favorites` });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Internal server Error",
    });
  }
});

//Read
//Route qui permet de récupérer les favoris d'un utilisateur
router.get("/favorites", authenticated, async (req, res) => {
  try {
    const favoriteFound = await Favorite.find({ userId: req.id });

    res.status(201).json(favoriteFound);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Internal server Error",
    });
  }
});

//Exportation des routes
module.exports = router;
