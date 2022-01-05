const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
// const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");

require("dotenv").config();

 const cors = require('cors');
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

//Importations des routes
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://projet_p6:0qBMd1YTiAkbudBt@cluster0.dpgqw.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'+error));

app.use(helmet());
app.use(morgan("short"));

//route authentification pour user
app.use("/api/auth", userRoutes);
//route authentification sauce
app.use("/api/sauces", saucesRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));



app.use(cors());

module.exports = app;