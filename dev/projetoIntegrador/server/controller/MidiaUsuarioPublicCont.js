const MidiaUsuario = require("../model/MidiaUsuarioSchema");
const Midia = require("../model/MidiaSchema");

module.exports = {
  listar: async (req, res) => {
    MidiaUsuario.find((err, objetos) => {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    })
      .populate("midia")
      .populate("usuario")
      .sort({ status: 1 });
  },
  incluir: async (req, res) => {
    let obj = new MidiaUsuario(req.body);
    let Nota = obj.nota;
    MidiaUsuario.find(
      { usuario: obj.usuario, midia: obj.midia },
      (err, objetos) => {
        if (err) {
          res.status(400).send({ message: "Erro ao incluir mídia do usuário" });
        } else if (objetos.length > 0) {
          res.status(406).send({
            message: "Mídia já cadastrada para o usuário",
          });
        } else {
          Midia.findOne({ _id: obj.midia }, function (err, midia) {
            if (err) {
              res
                .status(400)
                .send(
                  "Erro ao buscar a mídia para atualizar a nota média e a quantidade de notas"
                );
            } else {
              let qtdNotas = midia.qtdNotas;
              let notaMedia = midia.notaMedia;
              let novaNotaMedia =
                (notaMedia * qtdNotas + Nota) / (qtdNotas + 1);
              Midia.updateOne(
                { _id: obj.midia },
                { notaMedia: novaNotaMedia.toFixed(2), qtdNotas: qtdNotas + 1 },
                function (err) {
                  if (err) {
                    res
                      .status(400)
                      .send(
                        "Erro ao atualizar a nota média e a quantidade de notas da mídia"
                      );
                  } else {
                    obj.save((err, obj) => {
                      err
                        ? res.status(400).send(err)
                        : res.status(200).json(obj);
                    });
                  }
                }
              );
            }
          });
        }
      }
    );
  },
  alterar: async (req, res) => {
    let obj = new MidiaUsuario(req.body);
    let Nota = obj.nota;
    MidiaUsuario.findOne({ _id: obj._id }, function (err, midiaUsuario) {
      if (err) {
        res.status(400).send("Erro ao buscar a mídia para atualizar a nota");
      } else {
        let NotaAntiga = midiaUsuario.nota;
        Midia.findOne({ _id: obj.midia }, function (err, midia) {
          if (err) {
            res
              .status(400)
              .send(
                "Erro ao buscar a mídia do usuário para atualizar a nota média e a quantidade de notas"
              );
          } else {
            let qtdNotas = midia.qtdNotas;
            let notaMedia = midia.notaMedia;
            let novaNotaMedia =
              (notaMedia * qtdNotas - NotaAntiga + Nota) / qtdNotas;
            Midia.updateOne(
              { _id: obj.midia },
              { notaMedia: novaNotaMedia.toFixed(2) },
              function (err) {
                if (err) {
                  res
                    .status(400)
                    .send(
                      "Erro ao atualizar a nota média e a quantidade de notas da mídia"
                    );
                } else {
                  MidiaUsuario.updateOne({ _id: obj._id }, obj, function (err) {
                    if (err) {
                      res
                        .status(400)
                        .send("Erro ao atualizar a mídia do usuário");
                    } else {
                      res
                        .status(200)
                        .send("Mídia do usuário atualizada com sucesso");
                    }
                  });
                }
              }
            );
          }
        });
      }
    });
  },
  excluir: async (req, res) => {
    MidiaUsuario.findOne({ _id: req.params.id }, function (err, midiaUsuario) {
      if (err) {
        res.status(400).send("Erro ao buscar a mídia para excluir a nota");
      } else {
        let Nota = midiaUsuario.nota;
        Midia.findOne({ _id: midiaUsuario.midia }, function (err, midia) {
          if (err) {
            res
              .status(400)
              .send(
                "Erro ao buscar a mídia do usuário para excluir a nota média e a quantidade de notas"
              );
          } else {
            let qtdNotas = midia.qtdNotas;
            let notaMedia = midia.notaMedia;
            let novaNotaMedia = (notaMedia * qtdNotas - Nota) / (qtdNotas - 1);
            if (qtdNotas === 1) {
              Midia.updateOne(
                { _id: midiaUsuario.midia },
                { notaMedia: 0, qtdNotas: 0 },
                function (err) {
                  if (err) {
                    res
                      .status(400)
                      .send(
                        "Erro ao excluir a nota média e a quantidade de notas da mídia"
                      );
                  } else {
                    MidiaUsuario.deleteOne(
                      { _id: req.params.id },
                      function (err) {
                        if (err) {
                          res
                            .status(400)
                            .send("Erro ao excluir a mídia do usuário");
                        } else {
                          res

                            .status(200)
                            .send("Mídia do usuário excluída com sucesso");
                        }
                      }
                    );
                  }
                }
              );
            } else {
              Midia.updateOne(
                { _id: midiaUsuario.midia },
                { notaMedia: novaNotaMedia.toFixed(2), qtdNotas: qtdNotas - 1 },
                function (err) {
                  if (err) {
                    res
                      .status(400)
                      .send(
                        "Erro ao excluir a nota média e a quantidade de notas da mídia"
                      );
                  } else {
                    MidiaUsuario.deleteOne(
                      { _id: req.params.id },
                      function (err) {
                        if (err) {
                          res
                            .status(400)
                            .send("Erro ao excluir a mídia do usuário");
                        } else {
                          res
                            .status(200)
                            .send("Mídia do usuário excluída com sucesso");
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        });
      }
    });
  },
  obterPeloId: (req, res) => {
    MidiaUsuario.findOne({ _id: req.params.id }, function (err, obj) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    })
      .populate("midia")
      .populate("usuario");
  },
  filtrar: (req, res) => {
    MidiaUsuario.find(
      {
        $or: [{ status: { $regex: req.params.filtro, $options: "i" } }],
      },
      function (err, obj) {
        err ? res.status(400).send(err) : res.status(200).json(obj);
      }
    )
      .populate("midia")
      .populate("usuario")
      .sort({ status: -1 });
  },
  listarFavoritos: async (req, res) => {
    MidiaUsuario.find(
      { usuario: req.params.id, favorito: "Sim" },
      function (err, obj) {
        err ? res.status(400).send(err) : res.status(200).json(obj);
      }
    )
      .populate("midia")
      .populate("usuario")
      .sort({ status: 1 });
  },
  listarPorUsuario: async (req, res) => {
    MidiaUsuario.find({ usuario: req.params.id }, function (err, obj) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    })
      .populate("midia")
      .populate("usuario")
      .sort({ status: 1 });
  },
  listarPorStatus: async (req, res) => {
    MidiaUsuario.find(
      { usuario: req.params.id, status: req.params.status },
      function (err, obj) {
        err ? res.status(400).send(err) : res.status(200).json(obj);
      }
    )
      .populate("midia")
      .populate("usuario")
      .sort({ status: 1 });
  },
};
