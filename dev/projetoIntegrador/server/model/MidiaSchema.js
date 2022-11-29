const mongoose = require("mongoose");
const MidiaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  resumo: { type: String, required: true },
  restricaoIdade: { type: Number, required: true },
  dataLancamento: { type: Date, required: true },
  imagem: { type: String, required: false },
  numeroCronologico: { type: Number, required: true },
  notaMedia: { type: Number, required: false, default: 0 },
  qtdNotas: { type: Number, required: false, default: 0 },
  tipoMidia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TipoMidia",
    required: true,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Autor",
    required: true,
  },
  genero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genero",
    required: true,
  },
});
module.exports = mongoose.model("Midia", MidiaSchema);
