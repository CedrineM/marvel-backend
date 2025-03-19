//import des packages requis
const express = require("express");
const router = express.Router();
const axios = require("axios");

//Read
//route de récupération des comics avec possibilité de recherche
router.get("/comics", async (req, res) => {
  try {
    const { title, skip, limit } = req.query;
    let urlComics = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_SECRET}`;
    if (title) {
      urlComics += `&title=${title}`;
    }
    if (skip) {
      urlComics += `&skip=${skip}`;
    }
    if (limit) {
      if (limit > 0 && limit <= 100) {
        urlComics += `&limit=${limit}`;
      }
      throw {
        message: "the limit must be a number between 0 and 100",
        status: 400,
      };
    }

    const response = await axios.get(urlComics);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error;
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server Error" });
  }
});

//route de récupération d'un comics avec sont ID
router.get("/comic/:comicId", async (req, res) => {
  try {
    const { comicId } = req.params;
    if (!comicId) {
      throw {
        message: "an ID must be given",
        status: 400,
      };
    }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.MARVEL_API_SECRET}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error;
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server Error" });
  }
});

//route de récupération des comics lier à un ID personnages
router.get("/comics/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;
    if (!characterId) {
      throw {
        message: "an ID must be given",
        status: 400,
      };
    }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_API_SECRET}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error;
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server Error" });
  }
});

//export des routes
module.exports = router;
