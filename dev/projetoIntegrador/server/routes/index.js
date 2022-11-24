const { Router } = require("express");
const routes = Router();

var cors = require("cors");
routes.use(cors({ origin: "*" }));

const loginPublicRout = require("./LoginPublicRout");
routes.use("/api", loginPublicRout);

const loginRout = require("./LoginRout");
routes.use("/api", loginRout);

const midiaPublicRout = require("./MidiaPublicRout");
routes.use("/api", midiaPublicRout);

const tipoMidiaPublicRout = require("./TipoMidiaPublicRout");
routes.use("/api", tipoMidiaPublicRout);

const generoPublicRout = require("./GeneroPublicRout");
routes.use("/api", generoPublicRout);

const usuarioPublicRout = require("./UsuarioPublicRout");
routes.use("/api", usuarioPublicRout);

const midiaUsuarioPublicRout = require("./MidiaUsuarioPublicRout");
routes.use("/api", midiaUsuarioPublicRout);

const jwt = require("jsonwebtoken");
routes.use(function (req, res, next) {
    try {
    const token = req.header("x-auth-token");
        if (!token)
        return res.status(403).send({
        message: "Não possui token de autenticação. Acesso não autorizado!",
        });
    jwt.verify(token, process.env.JWT_PRIV_KEY, function (err, decoded) {
        if (err)
            return res.status(500).send({
            auth: false,
            message: "Token inválido. Acesso não autorizado!",
        });
    req.userId = decoded._id;
    req.userName = decoded.nome;
    next();
    });
   } catch (error) {
        res.status(400).send("Erro no token de autenticação!");
    }
});

const usuarioRout = require("./UsuarioRout");
routes.use("/api", usuarioRout);
const autorRout = require("./AutorRout");
routes.use("/api", autorRout);
const generoRout = require("./GeneroRout");
routes.use("/api", generoRout);
const tipoMidiaRout = require("./TipoMidiaRout");
routes.use("/api", tipoMidiaRout);
const midiaRout = require("./MidiaRout");
routes.use("/api", midiaRout);
const midiaUsuarioRout = require("./MidiaUsuarioRout");
routes.use("/api", midiaUsuarioRout);
module.exports = routes;