const mongoose = require("mongoose");
const TipoMidiaSchema = new mongoose.Schema({
  nome: { type: String, required: true }
});
module.exports = mongoose.model("TipoMidia", TipoMidiaSchema);