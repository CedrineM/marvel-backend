//import des packages requis
const express = require("express");
const router = express.Router();
const axios = require("axios");

//Read
//route de récupération des personnages avec possibilité de recherche
router.get("/characters", async (req, res) => {
  try {
    const { name, page, limit } = req.query;
    let urlCharacters = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_SECRET}`;
    if (name) {
      urlCharacters += `&name=${name}`;
    }

    if (limit) {
      if (limit > 0 && limit <= 100) {
        urlCharacters += `&limit=${limit}`;
      } else {
        throw {
          message: "the limit must be a number between 0 and 100",
          status: 400,
        };
      }
    }

    if (page) {
      const skip = (page - 1) * (limit || 100);
      urlCharacters += `&skip=${skip}`;
      console.log(skip);
    }

    const response = await axios.get(urlCharacters);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response || error.status || 500).json({
      message: error.response || error.message || "Internal server Error",
    });
  }
});

//route de récupération d'un personnage avec sont ID
router.get("/character/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;
    if (!characterId) {
      throw {
        message: "an ID must be given",
        status: 400,
      };
    }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.MARVEL_API_SECRET}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response.status || error.status || 500).json({
      message: error.response || error.message || "Internal server Error",
    });
  }
});

//export des routes
module.exports = router;
