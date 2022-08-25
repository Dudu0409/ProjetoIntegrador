console.log("Arquivo server.js executou com sucesso!");

const express = require("express");
const app = express();
app.use(express.json());
//require("dotenv").config();

const port = process.env.PORT || 3000;

require("./server/banco/mongo");

const routes = require("./server/routes/index");
app.use(routes);

app.listen(port, () => {
  return console.log("API executando na porta " + port);
});
