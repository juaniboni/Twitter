const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/TweetController");

// Rutas relacionadas a los artículos:
// ...

router.get("/", tweetController.index);

// esta para subir un tweet
router.post("/", tweetController.store);

router.get("/:id", tweetController.show);

// esta ruta para updatear los likes del tweet
router.patch("/:id", tweetController.update);

router.delete("/:id", tweetController.destroy);

module.exports = router;
