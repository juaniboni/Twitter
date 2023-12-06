const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/TweetController");
const { expressjwt: checkJwt } = require("express-jwt");

  
// Rutas relacionadas a los tweets:

// Obtener todos los tweets
router.get("/",checkJwt({ secret: "stringsecreto", algorithms: ["HS256"] }) ,tweetController.index);

// Crear un nuevo tweet
router.post("/",checkJwt({ secret: "stringsecreto", algorithms: ["HS256"] }) ,tweetController.store);

// Obtener un tweet por ID
router.get("/:id",checkJwt({ secret: "stringsecreto", algorithms: ["HS256"] })  ,tweetController.show);

// Actualizar likes del tweet
router.patch("/:id/like",checkJwt({ secret: "stringsecreto", algorithms: ["HS256"] }) ,tweetController.update);

// Eliminar un tweet
router.delete("/:id",checkJwt({ secret: "stringsecreto", algorithms: ["HS256"] }),tweetController.destroy);

module.exports = router;
