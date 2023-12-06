const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/TweetController");

  
// Rutas relacionadas a los tweets:

// Obtener todos los tweets
router.get("/", tweetController.index);

// Crear un nuevo tweet
router.post("/",  tweetController.store);

// Obtener un tweet por ID
router.get("/:id", tweetController.show);

// Actualizar likes del tweet
router.patch("/:id/like", tweetController.update);

// Eliminar un tweet
router.delete("/:id", tweetController.destroy);

module.exports = router;
