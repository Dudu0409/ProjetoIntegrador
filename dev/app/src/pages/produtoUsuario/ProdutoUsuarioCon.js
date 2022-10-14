import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import ProdutoUsuarioList from "./ProdutoUsuarioList";
import ProdutoUsuarioForm from "./ProdutoUsuarioForm";
import ProdutoUsuarioSrv from "./ProdutoUsuarioSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function ProdutoUsuarioCon() {
  const [produtosUsuarios, setProdutosUsuarios] = useState([]);
  const initialState = {
    id: null,
    status: "",
    nota: "",
    produto: "",
    usuario: ""
  };
  const [produtoUsuario, setProdutoUsuario] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    onClickAtualizar(); // ao inicializar executa o método para atualizar
  }, []);

  const onClickAtualizar = () => {
    ProdutoUsuarioSrv.listar()
      .then((response) => {
        setProdutosUsuarios(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Produtos Usuários Atualizados!",
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
    setProdutoUsuario(initialState);
    setEditando(true);
  };

  const salvar = () => {
    //inclusão
    if (produtoUsuario._id == null) {
      ProdutoUsuarioSrv.incluir(produtoUsuario)
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
      ProdutoUsuarioSrv.alterar(produtoUsuario)
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
    setProdutoUsuario(produtosUsuarios.filter((produtoUsuario) => produtoUsuario._id === id)[0]);
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
    ProdutoUsuarioSrv.excluir(_id)
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
        <ProdutoUsuarioList
          produtosUsuarios={produtosUsuarios}
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
        <ProdutoUsuarioForm
          produtoUsuario={produtoUsuario}
          setProdutoUsuario={setProdutoUsuario}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}

export default ProdutoUsuarioCon;
