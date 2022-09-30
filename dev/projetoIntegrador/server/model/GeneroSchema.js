const mongoose = require("mongoose");
const GeneroSchema = new mongoose.Schema({
  descricao: { type: String, required: true }
});
module.exports = mongoose.model("Genero", GeneroSchema);