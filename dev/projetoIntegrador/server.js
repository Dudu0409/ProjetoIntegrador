console.log("Arquivo server.js executou com sucesso!");

const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

require("./server/banco/mongo");

const routes = require("./server/routes/index");
app.use(routes);

module.exports = app;
