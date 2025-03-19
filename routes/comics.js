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

//export des routes
module.exports = router;
