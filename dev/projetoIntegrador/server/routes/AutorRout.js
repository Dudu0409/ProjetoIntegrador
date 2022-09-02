const express = require("express");
const routes = express.Router();
const controle = require("../controller/AutorCont");

routes.route("/autores").get(controle.listar);
routes.route("/autores").post(controle.incluir);
routes.route("/autores").put(controle.alterar);
routes.route("/autores/:id").delete(controle.excluir);
routes.route("/autores/:id").get(controle.obterPeloId);
routes.route("/autores/filtro/:filtro").get(controle.filtrar);
module.exports = routes;
