const express = require("express");
const routes = express.Router();
const controle = require("../controller/LoginCont");

routes.route("/logout").post(controle.logout);
routes.route("/loginAdmin").post(controle.loginAdmin);
routes.route("/register").post(controle.register);
module.exports = routes;
