const express = require("express");
const routes = express.Router();
const controle = require("../controller/GeneroPublicCont");

routes.route("/generosPublic").get(controle.listar);
routes.route("/generosPublic/:id").get(controle.obterPeloId);
routes.route("/generosPublic/filtro/:filtro").get(controle.filtrar);
module.exports = routes;
