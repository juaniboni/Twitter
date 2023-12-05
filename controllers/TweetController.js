const { Tweet, User, Like } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  try {
    const tweets = await Tweet.findAll({
      include: User,
      order: [["createdAt", "DESC"]],
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
    console.log("Received content:", content);

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
  console.log("se ha creado un tweet");
}

// Update the specified resource in storage.
async function update(req, res) {
  const userId = req.body.userId;
  const tweetId = req.params.id;
  const ifLike = req.body.ifLike;

  try {
    const existingLike = await Like.findOne({ where: { userId, tweetId } });

    if (ifLike === "1") {
      if (existingLike) {
        return res.json({ message: "Ya has dado like a este tweet" });
      } else {
        const newLike = await Like.create({
          userId,
          tweetId,
        });
        return res.json(newLike);
      }
    } else if (ifLike === "0") {
      if (existingLike) {
        await existingLike.destroy();
        return res.json({ message: "El like se ha eliminado" });
      } else {
        return res.json({ message: "No has dado like a este tweet aún" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al realizar la acción de like" });
  }
}

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
