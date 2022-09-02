const mongoose = require("mongoose");
//const jwt = require("jsonwebtoken");
const AutorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dataNascimento: {type: Date, required: true}
});
module.exports = mongoose.model("Autor", AutorSchema);