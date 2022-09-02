const mongoose = require("mongoose");
const ProdutoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  resumo: { type: String, required: true },
  restricaoIdade: { type: Number, required: true},
  dataLancamento: { type: Date, required: true },
  imagem: { data: Buffer, contentType: String},
  numeroCronologico: { type: Number, required: true },
  tipoMidia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TipoMidia",
    require: true,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Autor",
    require: true,
  },
  genero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genero",
    require: true,
  }
});
module.exports = mongoose.model("Produto", ProdutoSchema);
