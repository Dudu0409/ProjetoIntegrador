import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import MidiaList from "./MidiaAllList";
import MidiaForm from "./MidiaAllForm";
import MidiaSrv from "./MidiaAllSrv";
import MidiaUsuarioSrv from "../midiaUsuarioAll/MidiaUsuarioAllSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function MidiaCon() {
  const [midias, setMidias] = useState([]);
  const [midia, setMidia] = useState();
  const initialState = {
    id: null,
    status: "",
    nota: "",
    midia: "",
    usuario: JSON.parse(localStorage.getItem("userId")),
  };
  const [midiaUsuario, setMidiaUsuario] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    onClickAtualizar(); // ao inicializar executa o método para atualizar
  }, []);

  const onClickAtualizar = () => {
    MidiaSrv.listar()
      .then((response) => {
        setMidias(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Mídias atualizadas!",
          life: 3000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 3000,
        });
      });
  };

  const inserir = (idMidia) => {
    setMidia(idMidia);
    setMidiaUsuario(initialState);
    setEditando(true);
  };

  const salvar = () => {
    //inclusão
    if (midiaUsuario._id == null) {
      midiaUsuario.midia = midia;
      console.log(midiaUsuario);
      MidiaUsuarioSrv.incluir(midiaUsuario)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          toastRef.current.show({
            severity: "success",
            summary: "Salvou!",
            life: 2000,
          });
        })
        .catch((e) => {
          toastRef.current.show({
            severity: "error",
            summary: e.message,
            life: 4000,
          });
        });
    }
  };

  const cancelar = () => {
    setEditando(false);
  };

  const excluir = (_id) => {
    confirmDialog({
      message: "Confirma a exclusão?",
      header: "Confirmação",
      icon: "pi pi-question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluirConfirm(_id),
    });
  };
  const getNotaMedia = (_id) => {
    MidiaUsuarioSrv.notaMedia(_id)
      .then((response) => {
        toastRef.current.show({
          severity: "success",
          summary: `A nota média é: ${response.data}`,
          life: 2000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 4000,
        });
      });
  };

  const excluirConfirm = (_id) => {
    MidiaSrv.excluir(_id)
      .then((response) => {
        onClickAtualizar();
        toastRef.current.show({
          severity: "success",
          summary: "Excluído!",
          life: 2000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 4000,
        });
      });
  };

  if (!editando) {
    return (
      <div>
        <ConfirmDialog />
        <MidiaList
          midias={midias}
          onClickAtualizar={onClickAtualizar}
          inserir={inserir}
          excluir={excluir}
          getNotaMedia={getNotaMedia}
        />
        <Toast ref={toastRef} />
      </div>
    );
  } else {
    return (
      <div>
        <MidiaForm
          midiaUsuario={midiaUsuario}
          setMidiaUsuario={setMidiaUsuario}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}

export default MidiaCon;
