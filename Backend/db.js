const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.aavwb.mongodb.net/Groupomania",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connecté à la base MongoDB"))
  .catch((err) => console.log("Erreur de connexion à la base MongoDB", err));
