const express = require("express");
const routes = express.Router();
const controle = require("../controller/MidiaCont");

routes.route("/midias").get(controle.listar);
routes.route("/midias").post(controle.incluir);
routes.route("/midias").put(controle.alterar);
routes.route("/midias/:id").delete(controle.excluir);
routes.route("/midias/:id").get(controle.obterPeloId);
routes.route("/midias/filtro/:filtro").get(controle.filtrar);
module.exports = routes;
