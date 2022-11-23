const express = require("express");
const routes = express.Router();
const controle = require("../controller/LoginCont");

routes.route("/loginAdmin").post(controle.loginAdmin);
routes.route("/logoutAdmin").post(controle.logout);
module.exports = routes;
