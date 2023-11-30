const { Tweet, User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  try {
    const tweets = await Tweet.findAll({
      order: [['createdAt', 'DESC']],
      limit: 20,
    });
    res.json(tweets);
  } catch (error) {
    console.error("Error fetching tweets:", error);
    res.status(500).send("An error occurred.");
  }
}


// Display the specified resource.
async function show(req, res) {}

// Store a newly created resource in storage.

async function store(req, res) {
  try {
    const content = req.body.content;

    // Log the received content
    console.log('Received content:', content);

    // si lo envian vacio
    if (!content) {
      return res.status(400).json({ error: "Tweet content is required" });
    }
    // Lo meto en la Base de Datos
    const newTweet = await Tweet.create({ content });
    // Respond with the created tweet in JSON format
    res.json(newTweet);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal Server Error" });
  }
  console.log("se ha creado un tweet")
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const tweetId = req.params.id;
  try {
    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) {
      return res.status(404).json({ error: "Tweet no encontrado" });
    }
    // const authorId = article.authorId;

    await tweet.destroy();
    console.log("Se ha eliminado el tweet con éxito.");
    // await Author.update({ lastArticleId: null }, { where: { id: authorId } });

    res.json({ message: "Tweet eliminado con exito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el artículo" });
  }
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
