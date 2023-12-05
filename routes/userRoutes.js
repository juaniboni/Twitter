const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

// Rutas relacionadas a los usuarios:
// ...

router.get("/", userController.index);

router.post("/", userController.store);

router.get(
  "/:username",
  checkJwt({ secret: "stringsecreto", algorithms: ["HS256"] }),
  userController.show,
);

router.patch("/:username", userController.update);

router.delete("/:username", userController.destroy);

module.exports = router;
