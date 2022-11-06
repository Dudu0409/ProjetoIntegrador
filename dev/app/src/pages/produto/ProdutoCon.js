import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import ProdutoList from "./ProdutoList";
import ProdutoForm from "./ProdutoForm";
import ProdutoSrv from "./ProdutoSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function ProdutoCon() {
  const [produtos, setProdutos] = useState([]);
  const initialState = {
    id: null,
    titulo: "",
    resumo: "",
    restricaoIdade: "",
    dataLancamento: "",
    imagem: "",
    numeroCronologico: "",
    tipoMidia: "",
    autor: "",
    genero: ""
  };
  const [produto, setProduto] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    onClickAtualizar(); // ao inicializar executa o método para atualizar
  }, []);

  const onClickAtualizar = () => {
    ProdutoSrv.listar()
      .then((response) => {
        setProdutos(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Produtos atualizados!",
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
    setProduto(initialState);
    setEditando(true);
  };

  const salvar = () => {
    //inclusão
    if (produto._id == null) {
      ProdutoSrv.incluir(produto)
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
      ProdutoSrv.alterar(produto)
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
    setProduto(produtos.filter((produto) => produto._id === id)[0]);
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
    ProdutoSrv.excluir(_id)
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
        <ProdutoList
          produtos={produtos}
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
        <ProdutoForm
          produto={produto}
          setProduto={setProduto}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}

export default ProdutoCon;
