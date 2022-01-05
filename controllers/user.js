// importation modele du Schema User
const User = require('../models/User');

// importation cryptage et création token
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const console = require('console');

//signup pour enregistrer le nouvel utilisateur dans la base de données
//hashage des données prealable à l'envoi à la base de données

exports.signup = (req, res,next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
    const user = new User({
    email: req.body.email ,
    password :hash
  });
  user.
  save()
    .then(() => res.status(201).json({message :" Utilisateur créé et sauvegardé!"}))
    .catch((error) => res.status(400).json({error}));
  })
  .catch((error) => res.status(500).json({ error }));

};
//login pour enregistrer le nouvel utilisateur dans la base de donnée 
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }

          const token = jwt.sign({ userId: user._id }, process.env.HIDDEN_TOKEN, { expiresIn: "24h" });
          console.log("Login réussie !");
          console.log("Création du token = ", token);
          res.status(200).json({
            userId: user._id,
            token: token
            });
          })
        .catch((error) => res.status(500).json({ error :"error-1" }));
    })
    .catch((error) => res.status(500).json({ error :"error-2" }));
};