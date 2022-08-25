const mongoose = require("mongoose");
const uri =
  "mongodb://admin:admin@localhost:27018/projetoIntegrador?authSource=projetoIntegrador";
mongoose.connect(uri, {});
