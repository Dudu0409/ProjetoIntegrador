const express = require("express");
const routes = express.Router();
const controle = require("../controller/UsuarioPublicCont");

routes.route("/usuariosPublic").post(controle.incluir);
module.exports = routes;
