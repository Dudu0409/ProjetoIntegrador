const TipoMidia = require("../model/TipoMidiaSchema");

module.exports = {
  listar: async (req, res) => {
    TipoMidia.find((err, objetos) => {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    }).sort({ nome: 1 });
  },
  obterPeloId: (req, res) => {
    TipoMidia.findOne({ _id: req.params.id }, function (err, obj) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },
  filtrar: (req, res) => {
    TipoMidia.find(
      {
        $or: [
          { nome: { $regex: req.params.filtro, $options: "i" } },
        ],
      },
      function (err, obj) {
        err ? res.status(400).send(err) : res.status(200).json(obj);
      }
    ).sort({ nome: -1 });
  },
};
