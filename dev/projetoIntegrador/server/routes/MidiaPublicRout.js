const express = require("express");
const routes = express.Router();
const controle = require("../controller/MidiaPublicCont");

routes.route("/midiasPublic").get(controle.listar);
routes.route("/midiasPublic/:id").get(controle.obterPeloId);
routes.route("/midiasPublic/filtro/:filtro").get(controle.filtrar);
module.exports = routes;
