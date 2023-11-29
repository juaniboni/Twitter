const { User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  try {
    res.json({ message: "Connected to the server!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Display the specified resource.
async function show(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const { firstname, lastname, username, email, bio, profilePic } = req.body;
  try {
    const newUser = await User.create({
      firstname,
      lastname,
      username,
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
};
