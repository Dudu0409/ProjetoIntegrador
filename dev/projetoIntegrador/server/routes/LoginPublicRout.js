const express = require("express");
const routes = express.Router();
const controle = require("../controller/LoginPublicCont");

routes.route("/loginPublic").post(controle.login);
routes.route("/logoutPublic").post(controle.logout);
routes.route("/registerPublic").post(controle.register);
module.exports = routes;
