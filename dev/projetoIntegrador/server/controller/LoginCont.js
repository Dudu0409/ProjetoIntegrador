const Usuario = require("../model/UsuarioSchema");
const bcrypt = require("bcrypt");

module.exports = {

  loginAdmin: async (req, res) => {
    Usuario.findOne(
      {
        email: req.body.email,
        tipo: "Admin",
      },
      async function (err, obj) {
        if (err) return res.status(400).send(err);
        if (!obj)
          return res.status(400).send("Email inválido ou senha inválida!");
        const senhaValidada = await bcrypt.compare(req.body.senha, obj.senha);
        if (!senhaValidada) return res.status(400).send("Senha inválida!");
        const token = obj.generateAuthToken();
        res.send(token);
      }
    );
  },

  logout: async (req, res) => {
    res.status(200).send({ auth: false, token: null });
  },

  register: async (req, res) => {
    const usuario = new Usuario({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      dataNascimento: req.body.dataNascimento,
    });
    try {
      const savedUsuario = await usuario.save();
      const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
      savedUsuario.senha = await bcrypt.hash(savedUsuario.senha, salt);
      res.send(savedUsuario);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
