const Usuario = require("../model/UsuarioSchema");
//const bcrypt = require("bcrypt");

module.exports = {
  listar: async (req, res) => {
    Usuario.find((err, objetos) => {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    }).sort({ nome: 1 });
  },

  incluir: async (req, res) => {
    let obj = new Usuario(req.body);
    // const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    // obj.senha = await bcrypt.hash(obj.senha, salt);
    obj.save((err, obj) => {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },
  alterar: async (req, res) => {
    let obj = new Usuario(req.body);
    // const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    // obj.senha = await bcrypt.hash(obj.senha, salt);
    Usuario.updateOne({ _id: obj._id }, obj, function (err) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },
  excluir: async (req, res) => {
    Usuario.deleteOne({ _id: req.params.id }, function (err) {
      err ? res.status(400).send(err) : res.status(200).json("message:ok");
    });
  },
  obterPeloId: (req, res) => {
    Usuario.findOne({ _id: req.params.id }, function (err, obj) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },
  filtrar: (req, res) => {
    Usuario.find(
      {
        $or: [
          { nome: { $regex: req.params.filtro, $options: "i" } },
          { email: { $regex: req.params.filtro, $options: "i" } },
          { tipo: { $regex: req.params.filtro, $options: "i" } },
        ],
      },
      function (err, obj) {
        err ? res.status(400).send(err) : res.status(200).json(obj);
      }
    ).sort({ nome: -1 });
  },
};
