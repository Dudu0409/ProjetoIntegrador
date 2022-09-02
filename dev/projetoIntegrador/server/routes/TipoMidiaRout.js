const express = require("express");
const routes = express.Router();
const controle = require("../controller/TipoMidiaCont");

routes.route("/tiposmidias").get(controle.listar);
routes.route("/tiposmidias").post(controle.incluir);
routes.route("/tiposmidias").put(controle.alterar);
routes.route("/tiposmidias/:id").delete(controle.excluir);
routes.route("/tiposmidias/:id").get(controle.obterPeloId);
routes.route("/tiposmidias/filtro/:filtro").get(controle.filtrar);
module.exports = routes;
