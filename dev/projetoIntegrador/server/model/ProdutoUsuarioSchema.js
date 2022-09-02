const mongoose = require("mongoose");
const ProdutoUsuarioSchema = new mongoose.Schema({
  status: { type: String, required: true },
  favorito: { type: Boolean, default: false },
  nota: { type: Number, required: true },
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produto",
    require: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    require: true,
  }
});
module.exports = mongoose.model("ProdutoUsuario", ProdutoUsuarioSchema);
