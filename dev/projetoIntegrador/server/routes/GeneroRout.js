const express = require("express");
const routes = express.Router();
const controle = require("../controller/GeneroCont");

routes.route("/generos").get(controle.listar);
routes.route("/generos").post(controle.incluir);
routes.route("/generos").put(controle.alterar);
routes.route("/generos/:id").delete(controle.excluir);
routes.route("/generos/:id").get(controle.obterPeloId);
routes.route("/generos/filtro/:filtro").get(controle.filtrar);
module.exports = routes;
