const Usuario = require("../model/UsuarioSchema");
const bcrypt = require("bcrypt");

module.exports = {
  incluir: async (req, res) => {
    let obj = new Usuario(req.body);
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    obj.senha = await bcrypt.hash(obj.senha, salt);
    obj.save((err, obj) => {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },
};
