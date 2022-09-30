const app = require("./server")
require("dotenv").config();

const port = process.env.API_PORT;

app.listen(port, () => {
    return console.log("API executando na porta " + port);
  });