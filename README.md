# 🔗Projet Marvel - Backend

## 📌 Description

Création d’un site web autour de l’univers Marvel Comics, réalisé dans le cadre d’un test technique pendant ma formation au Reacteur.

🎯 Objectif : développer une application fullstack en 5 jours, avec une évaluation à la clé (quelques corrections ont été apportées après le rendu initial).

L’application permet de consulter une liste de comics et de personnages Marvel, ainsi que de gérer des favoris.

## 🛠️ Technologies utilisées

- Express
- Axio
- mongoose
- cors
- crypto-js
- dotenv
- uid2

## 📦 Installation

```bash
git clone https://github.com/CedrineM/marvel-backend
cd nom-du-repo
npm install
npm start
```

## 🏗 Architecture

Le projet suit une architecture :

models/ : Définit les schémas Mongoose
routes/ : Contient les fichiers de routes pour chaque type d’événement
middlewares/ : Authentification, validation…

## 🔑 Configuration

Ajouter un fichier .env et renseigner les variables d’environnement :

```
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

## 🔧 API Endpoints

| Méthode | URL                       | Description                                         | Paramètres (exemples)                                                                  | Exemple de réponse                                                               |
| ------- | ------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `POST`  | `/user/signup`            | Crée un nouvel utilisateur                          | Body JSON : `{ "email": "charlie@mail.com", "username": "chacha", "password": "..." }` | `{ "_id": "...", "token": "...", "username": "chacha" }`                         |
| `POST`  | `/user/login`             | Connecte un utilisateur                             | Body JSON : `{ "email": "charlie@mail.com", "password": "..." }`                       | `{ "_id": "...", "token": "...", "username": "chacha" }`                         |
| `GET`   | `/characters`             | Récupère la liste des personnages                   | Query : `?name=spider&limit=10&page=2`                                                 | `{ "results": [ { "name": "Spider-Man", "description": "...", ... } ] }`         |
| `GET`   | `/character/:characterId` | Récupère un personnage par son ID                   | Param : `:characterId`                                                                 | `{ "character": { "name": "Iron Man", "description": "...", "comics": [...] } }` |
| `GET`   | `/comics`                 | Récupère la liste des comics                        | Query : `?title=avengers&limit=10&page=1`                                              | `{ "results": [ { "title": "Avengers #1", "description": "...", ... } ] }`       |
| `GET`   | `/comic/:comicId`         | Récupère un comic par son ID                        | Param : `:comicId`                                                                     | `{ "comic": { "title": "Avengers #1", "description": "...", ... } }`             |
| `GET`   | `/comics/:characterId`    | Récupère les comics liés à un personnage via son ID | Param : `:characterId`                                                                 | `{ "character": { "name": "Thor", "comics": [ {...}, {...} ] } }`                |

### 🛠 **Explication des colonnes** :

- **Méthode** : Type de requête HTTP (`GET`, `POST`, `PUT`, `DELETE`).
- **URL** : L'endpoint exact que ton API expose.
- **Description** : Ce que fait cet endpoint.
- **Paramètres** :
  - 🏷 **Route parameters** : Présents dans l'URL (`:id` par exemple).
  - 📩 **Body parameters** : Envoyés en JSON dans une requête `POST` ou `PUT`.
- **Exemple de réponse** : Un aperçu du JSON que ton API renvoie.

---

✍️ Auteur
[@CedrineM](https://github.com/CedrineM)
