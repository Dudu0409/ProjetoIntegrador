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

  incluir: async (req, res) => {
    let obj = new Midia(req.body);
    obj.save((err, obj) => {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },

  alterar: async (req, res) => {
    let obj = new Midia(req.body);
    Midia.updateOne({ _id: obj._id }, obj, function (err) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },

  excluir: async (req, res) => {
    Midia.deleteOne({ _id: req.params.id }, function (err) {
      err ? res.status(400).send(err) : res.status(200).json("message:ok");
    });
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
};
