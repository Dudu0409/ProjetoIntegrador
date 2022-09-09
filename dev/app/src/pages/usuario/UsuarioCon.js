import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import UsuarioList from "./UsuarioList";
import UsuarioForm from "./UsuarioForm";
import UsuarioSrv from "./UsuarioSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function UsuarioCon() {
  const [usuarios, setUsuarios] = useState([]);
  const initialState = { id: null, nome: "", email: "", senha: "", dataNascimento: "" };
  const [usuario, setUsuario] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    onClickAtualizar(); // ao inicializar executa o método para atualizar
  }, []);

  const onClickAtualizar = () => {
    UsuarioSrv.listar()
      .then((response) => {
        setUsuarios(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Usuários Atualizados!",
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
    setUsuario(initialState);
    setEditando(true);
  };

  const salvar = () => {
    //inclusão
    if (usuario._id == null) {
      UsuarioSrv.incluir(usuario)
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
      UsuarioSrv.alterar(usuario)
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
    setUsuario(
      usuarios.filter((usuario) => usuario._id === id)[0]
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
    UsuarioSrv.excluir(_id)
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
        <UsuarioList
          usuarios={usuarios}
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
        <UsuarioForm
          usuario={usuario}
          setUsuario={setUsuario}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}

export default UsuarioCon;
