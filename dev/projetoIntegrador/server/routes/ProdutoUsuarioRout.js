const express = require("express");
const routes = express.Router();
const controle = require("../controller/ProdutoUsuarioCont");

routes.route("/produtosusuarios").get(controle.listar);
routes.route("/produtosusuarios").post(controle.incluir);
routes.route("/produtosusuarios").put(controle.alterar);
routes.route("/produtosusuarios/:id").delete(controle.excluir);
routes.route("/produtosusuarios/:id").get(controle.obterPeloId);
routes.route("/produtosusuarios/filtro/:filtro").get(controle.filtrar);
module.exports = routes;
