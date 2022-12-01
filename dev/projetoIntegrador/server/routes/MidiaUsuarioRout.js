const express = require("express");
const routes = express.Router();
const controle = require("../controller/MidiaUsuarioCont");

routes.route("/midiasusuarios").get(controle.listar);
routes.route("/midiasusuarios").post(controle.incluir);
routes.route("/midiasusuarios").put(controle.alterar);
routes.route("/midiasusuarios/:id").delete(controle.excluir);
routes.route("/midiasusuarios/:id").get(controle.obterPeloId);
routes.route("/midiasusuarios/filtro/:filtro").get(controle.filtrar);
routes.route("/midiasusuarios/listfavoritos/:id").get(controle.listarFavoritos);
routes.route("/midiasusuarios/listusuario/:id").get(controle.listarPorUsuario);

module.exports = routes;
