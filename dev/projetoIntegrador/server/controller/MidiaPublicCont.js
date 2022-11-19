const Midia = require("../model/MidiaSchema");

module.exports = {
  listar: async (req, res) => {
    Midia.find((err, objetos) => {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    })
      .populate("tipoMidia")
      .populate("autor")
      .populate("genero")
      .sort({ titulo: 1 });
  },

  obterPeloId: (req, res) => {
    Midia.findOne({ _id: req.params.id }, function (err, obj) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    })
      .populate("tipoMidia")
      .populate("autor")
      .populate("genero");
  },

  filtrar: (req, res) => {
    Midia.find(
      {
        $or: [
          { titulo: { $regex: req.params.filtro, $options: "i" } },
          { resumo: { $regex: req.params.filtro, $options: "i" } },
        ],
      },
      function (err, obj) {
        err ? res.status(400).send(err) : res.status(200).json(obj);
      }
    )
      .populate("tipoMidia")
      .populate("autor")
      .populate("genero")
      .sort({ titulo: -1 });
    },

    filtrarPorGenero: (req, res) => {
      Midia.find({ genero: req.params.id }, function (err, obj) {
        err ? res.status(400).send(err) : res.status(200).json(obj);
      })
        .populate("tipoMidia")
        .populate("autor")
        .populate("genero")
        .sort({ titulo: -1 });
    },
  
    filtrarPorTipoMidia: (req, res) => {
      Midia.find({ tipoMidia: req.params.id }, function (err, obj) {
        err ? res.status(400).send(err) : res.status(200).json(obj);
      })
        .populate("tipoMidia")
        .populate("autor")
        .populate("genero")
        .sort({ titulo: -1 });
    },
  };
