const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

// Rutas relacionadas a los usuarios:
// ...


router.get("/", checkJwt({ secret: "stringsecreto", algorithms: ["HS256"] }) ,userController.index);

router.post("/", userController.store);

router.get(
  "/:username",
  checkJwt({ secret: "stringsecreto", algorithms: ["HS256"] }),
  userController.show,
);

router.patch("/:username",  checkJwt({ secret: "stringsecreto", algorithms: ["HS256"] }),userController.update);

router.delete("/:username", checkJwt({ secret: "stringsecreto", algorithms: ["HS256"] }) ,userController.destroy);

module.exports = router;
