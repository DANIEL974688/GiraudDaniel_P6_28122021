//Relié à mongoose
const mongoose = require('mongoose');
// Validation unique
const uniqueValidator = require('mongoose-unique-validator');

//modéle de base de données pour signup (enregistre un nouvel utilisateur)
const userSchema = mongoose.Schema({
    email: String,   
    password: String 
});
//application du validateur unique  à notre schéma
 userSchema.plugin(uniqueValidator);

//exportation du module
module.exports = mongoose.model("User", userSchema);