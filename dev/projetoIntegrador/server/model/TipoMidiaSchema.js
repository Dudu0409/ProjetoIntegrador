const mongoose = require("mongoose");
//const jwt = require("jsonwebtoken");
const TipoMidiaSchema = new mongoose.Schema({
  nome: { type: String, required: true }
});
module.exports = mongoose.model("TipoMidia", TipoMidiaSchema);