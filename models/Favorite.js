//importation des package requis
const mongoose = require("mongoose");

//création du shéma des favoris
const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["characters", "comics"], required: true }, // Type du favori
  itemId: { type: String, required: true }, // ID de l'élément à mettre en favori
  addedAt: { type: Date, default: Date.now },
});

// création d'un index combiner permettant de récupérer plus rapidement et facilement les favoris d'un utilisateur création d'un tableau d'indexiation par MongoDB
favoriteSchema.index({ userId: 1, itemId: 1 }, { unique: true });

// puis création du modèle baser sur le schéma
const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
