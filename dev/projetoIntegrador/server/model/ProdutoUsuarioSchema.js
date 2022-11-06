const mongoose = require("mongoose");
const ProdutoUsuarioSchema = new mongoose.Schema({
  status: { type: String, required: true },
  favorito: { type: Boolean, default: false },
  nota: { type: Number, required: true },
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produto",
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  }
});
module.exports = mongoose.model("ProdutoUsuario", ProdutoUsuarioSchema);
