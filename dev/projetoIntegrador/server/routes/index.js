const { Router } = require("express");
const routes = Router();

var cors = require("cors");
routes.use(cors({ origin: "*" }));

// const loginRout = require("./LoginRout");
// routes.use("/api", loginRout);

// const jwt = require("jsonwebtoken");
// routes.use(function (req, res, next) {
//   // interceptar as requisições a validar o token
//   try {
//     const token = req.header("x-auth-token");
//     if (!token)
//       return res.status(403).send({
//         message: "Não possui token de autenticação. Acesso não autorizado!",
//       });
//     jwt.verify(token, process.env.JWT_PRIV_KEY, function (err, decoded) {
//       if (err)
//         return res.status(500).send({
//           auth: false,
//           message: "Token inválido. Acesso não autorizado!",
//         });
//       // estando tudo certo guarda no request para uso posterior
//       req.userId = decoded._id;
//       req.userName = decoded.nome;
//       next();
//     });
//   } catch (error) {
//     res.status(400).send("Erro no token de autenticação!");
//   }
// });
const usuarioRout = require("./UsuarioRout");
routes.use("/api", usuarioRout);
const autorRout = require("./AutorRout");
routes.use("/api", autorRout);
const generoRout = require("./GeneroRout");
routes.use("/api", generoRout);
const tipoMidiaRout = require("./TipoMidiaRout");
routes.use("/api", tipoMidiaRout);
const produtoRout = require("./ProdutoRout");
routes.use("/api", produtoRout);
const produtoUsuarioRout = require("./ProdutoUsuarioRout");
routes.use("/api", produtoUsuarioRout);
module.exports = routes;