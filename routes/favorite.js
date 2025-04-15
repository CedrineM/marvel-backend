//import des packages et middlewares requis
const express = require("express");

const authenticated = require("../middlewares/authenticated"); // recupère id utilisateur dans req.id

//importation des models
const Favorite = require("../models/Favorite");

//utilisation de Router
const router = express.Router();

//Create/ Delete
//POST ==> route pour enregistrer ou supprimer un favori(authentification requise)
router.post("/favorite", authenticated, async (req, res) => {
  try {
    const { item, type } = req.body;
    if (!item || !type) {
      throw {
        message:
          "You will need to provide the item ID and type to be able to add it to your favorites.",
        status: 400,
      };
    }
    // recherche si le favori existe pour l'utilisateur
    const existingFavorite = await Favorite.findOne({
      item: item,
      user: req.id,
    });

    // si le favori existe alors suppression de la liste des favoris
    if (existingFavorite) {
      await Favorite.findByIdAndDelete(existingFavorite._id);
      return res.status(200).json({
        message: `this ${existingFavorite.type} has been removed from favorites`,
        object: existingFavorite,
      });
    }

    // si le favori n'existe pas alors ajoute à la liste des favoris
    else {
      const newFavorite = new Favorite({
        user: req.id,
        type: type, // Type du favori
        item: item, // l'élément à mettre en favorie
      });

      await newFavorite.save();
      return res.status(201).json({
        message: `This ${type} has been added to your favorites`,
        object: newFavorite,
      });
    }
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Internal server Error",
    });
  }
});

//Read
//GET ==> Route qui permet de récupérer les favoris d'un utilisateur
router.get("/favorites", authenticated, async (req, res) => {
  try {
    const favoriteFound = await Favorite.find({ user: req.id });

    return res.status(200).json(favoriteFound);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Internal server Error",
    });
  }
});

//Exportation des routes
module.exports = router;
