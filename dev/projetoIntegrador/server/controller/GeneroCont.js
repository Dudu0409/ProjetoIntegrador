const Genero = require("../model/GeneroSchema");

module.exports = {
  listar: async (req, res) => {
    Genero.find((err, objetos) => {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    }).sort({ descricao: 1 });
  },

  incluir: async (req, res) => {
    let obj = new Genero(req.body);
    obj.save((err, obj) => {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },
  alterar: async (req, res) => {
    let obj = new Genero(req.body);
    Genero.updateOne({ _id: obj._id }, obj, function (err) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },
  excluir: async (req, res) => {
    Genero.deleteOne({ _id: req.params.id }, function (err) {
      err ? res.status(400).send(err) : res.status(200).json("message:ok");
    });
  },
  obterPeloId: (req, res) => {
    Genero.findOne({ _id: req.params.id }, function (err, obj) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },
  filtrar: (req, res) => {
    Genero.find(
      {
        $or: [
          { descricao: { $regex: req.params.filtro, $options: "i" } },
        ],
      },
      function (err, obj) {
        err ? res.status(400).send(err) : res.status(200).json(obj);
      }
    ).sort({ descricao: -1 });
  },
};
