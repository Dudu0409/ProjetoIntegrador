const express = require("express");
const routes = express.Router();
const controle = require("../controller/TipoMidiaPublicCont");

routes.route("/tiposmidiasPublic").get(controle.listar);
routes.route("/tiposmidiasPublic/:id").get(controle.obterPeloId);
routes.route("/tiposmidiasPublic/filtro/:filtro").get(controle.filtrar);
module.exports = routes;
