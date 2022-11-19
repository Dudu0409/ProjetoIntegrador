const express = require("express");
const routes = express.Router();
const controle = require("../controller/MidiaUsuarioPublicCont");

routes.route("/midiasusuariosPublic").get(controle.listar);
routes.route("/midiasusuariosPublic/:id").get(controle.obterPeloId);
routes.route("/midiasusuariosPublic/filtro/:filtro").get(controle.filtrar);
routes.route("/midiasusuariosPublic/favoritar/:id").get(controle.favoritar);
routes.route("/midiasusuariosPublic/listfavoritos/:id").get(controle.listarFavoritos);
routes.route("/midiasusuariosPublic/notamedia/:id").get(controle.notaMedia);


module.exports = routes;
