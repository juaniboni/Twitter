const { User, Tweet } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Display a listing of the resource.
async function index(req, res) {
  const allUsers = await User.findAll();
  try {
    res.json(allUsers);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    const userName = req.params.username;
    const user = await User.findOne({ where: { username: userName }, include: Tweet });

    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    // esta variable es un user sin el password
    const userWithoutPassword = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
      tweets: user.tweets,
    };

    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred.");
  }
}

async function login(req, res) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const user = await User.findOne({ where: { email: userEmail } });
  if (user.length === 0) {
    return res.json("Este usuario no existe");
  }

  const validatePassword = await bcrypt.compare(userPassword, user.password);

  console.log(validatePassword);
  console.log(userPassword);

  if (validatePassword === false) {
    return res.json("Las credenciales son incorrectas");
  }

  // Habiendo validado todos los datos, nos vamos a dedicar a elaborar un token...
  const token = jwt.sign({ id: user.id }, "stringsecreto");

  return res.json(token);
}

// Store a newly created resource in storage.
async function store(req, res) {
  const { firstname, lastname, username, password, email, bio, profilePic } = req.body;
  try {
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      password,
      email,
      bio,
      profilePic,
    });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
  console.log("se ha creado un nuevo usuario");
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  login,
};
