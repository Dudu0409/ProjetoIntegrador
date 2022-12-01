const mongoose = require("mongoose");
const MidiaUsuarioSchema = new mongoose.Schema({
  status: { type: String, required: true },
  favorito: { type: String, default: "Não" },
  nota: { type: Number, required: true },
  midia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Midia",
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  }
});
module.exports = mongoose.model("MidiaUsuario", MidiaUsuarioSchema);
