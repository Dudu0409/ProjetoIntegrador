import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import MidiaUsuarioList from "./MidiaUsuarioConcluidoList";
import MidiaUsuarioForm from "./MidiaUsuarioConcluidoForm";
import MidiaUsuarioSrv from "./MidiaUsuarioConcluidoSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function MidiaUsuarioCon() {
  const [midiasUsuarios, setMidiasUsuarios] = useState([]);
  const initialState = {
    id: null,
    status: "",
    nota: "",
    midia: "",
    usuario: JSON.parse(sessionStorage.getItem("userId")),
  };
  const [midiaUsuario, setMidiaUsuario] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    onClickAtualizar(); // ao inicializar executa o método para atualizar
  }, []);

  const onClickAtualizar = () => {
    MidiaUsuarioSrv.listarStatus(JSON.parse(sessionStorage.getItem("userId")))
      .then((response) => {
        setMidiasUsuarios(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Minhas mídias concluídas atualizadas!",
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

  const inserir = () => {
    setMidiaUsuario(initialState);
    setEditando(true);
  };

  const salvar = () => {
    //inclusão
    if (midiaUsuario._id == null) {
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
    } else {
      // alteração
      MidiaUsuarioSrv.alterar(midiaUsuario)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          toastRef.current.show({
            severity: "success",
            summary: "Alterado!",
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

  const editar = (id) => {
    setMidiaUsuario(
      midiasUsuarios.filter((midiaUsuario) => midiaUsuario._id === id)[0]
    );
    setEditando(true);
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

  const excluirConfirm = (_id) => {
    MidiaUsuarioSrv.excluir(_id)
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
        <MidiaUsuarioList
          midiasUsuarios={midiasUsuarios}
          onClickAtualizar={onClickAtualizar}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
        />
        <Toast ref={toastRef} />
      </div>
    );
  } else {
    return (
      <div>
        <MidiaUsuarioForm
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

export default MidiaUsuarioCon;
