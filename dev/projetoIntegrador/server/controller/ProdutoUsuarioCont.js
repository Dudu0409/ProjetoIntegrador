const ProdutoUsuario = require("../model/ProdutoUsuarioSchema");
module.exports = {
  listar: async (req, res) => {
    ProdutoUsuario.find((err, objetos) => {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    })
      .populate("produto")
      .populate("usuario")
      .sort({ status: 1 });
  },

  incluir: async (req, res) => {
    let obj = new ProdutoUsuario(req.body);
    obj.save((err, obj) => {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },
  alterar: async (req, res) => {
    let obj = new ProdutoUsuario(req.body);
    ProdutoUsuario.updateOne({ _id: obj._id }, obj, function (err) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },
  excluir: async (req, res) => {
    ProdutoUsuario.deleteOne({ _id: req.params.id }, function (err) {
      err ? res.status(400).send(err) : res.status(200).json("message:ok");
    });
  },
  obterPeloId: (req, res) => {
    ProdutoUsuario.findOne({ _id: req.params.id }, function (err, obj) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    })
    .populate("produto")
    .populate("usuario");
  },
  filtrar: (req, res) => {
    ProdutoUsuario.find(
      {
        $or: [
          { status: { $regex: req.params.filtro, $options: "i" } },
        ],
      },
      function (err, obj) {
        err ? res.status(400).send(err) : res.status(200).json(obj);
      }
    )
    .populate("produto")
    .populate("usuario")
    .sort({ status: -1 });
  },
};
