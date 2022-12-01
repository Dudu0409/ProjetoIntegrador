const express = require("express");
const routes = express.Router();
const controle = require("../controller/MidiaUsuarioPublicCont");

routes.route("/midiasusuariosPublic").get(controle.listar);
routes.route("/midiasusuariosPublic").post(controle.incluir);
routes.route("/midiasusuariosPublic").put(controle.alterar);
routes.route("/midiasusuariosPublic/:id").delete(controle.excluir);
routes.route("/midiasusuariosPublic/:id").get(controle.obterPeloId);
routes.route("/midiasusuariosPublic/filtro/:filtro").get(controle.filtrar);
routes.route("/midiasusuariosPublic/listfavoritos/:id").get(controle.listarFavoritos);
routes.route("/midiasusuariosPublic/listusuario/:id").get(controle.listarPorUsuario);
routes.route("/midiasusuariosPublic/liststatus/:id/:status").get(controle.listarPorStatus);

module.exports = routes;
