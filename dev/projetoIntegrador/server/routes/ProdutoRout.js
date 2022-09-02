const express = require("express");
const routes = express.Router();
const controle = require("../controller/ProdutoCont");

routes.route("/produtos").get(controle.listar);
routes.route("/produtos").post(controle.incluir);
routes.route("/produtos").put(controle.alterar);
routes.route("/produtos/:id").delete(controle.excluir);
routes.route("/produtos/:id").get(controle.obterPeloId);
routes.route("/produtos/filtro/:filtro").get(controle.filtrar);
module.exports = routes;
