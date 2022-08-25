const express = require("express");
const routes = express.Router();
const controle = require("../controller/UsuarioCont");

routes.route("/usuarios").get(controle.listar);
routes.route("/usuarios").post(controle.incluir);
routes.route("/usuarios").put(controle.alterar);
routes.route("/usuarios/:id").delete(controle.excluir);
routes.route("/usuarios/:id").get(controle.obterPeloId);
routes.route("/usuarios/filtro/:filtro").get(controle.filtrar);
module.exports = routes;
