import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import TipoMidiaList from "./TipoMidiaList";
import TipoMidiaForm from "./TipoMidiaForm";
import TipoMidiaSrv from "./TipoMidiaSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function TipoMidiaCon() {
  const [tiposMidias, setTiposMidias] = useState([]);
  const initialState = { id: null, nome: "" };
  const [tipoMidia, setTipoMidia] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    onClickAtualizar(); // ao inicializar executa o método para atualizar
  }, []);

  const onClickAtualizar = () => {
    TipoMidiaSrv.listar()
      .then((response) => {
        setTiposMidias(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Tipos de mídia atualizados!",
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
    setTipoMidia(initialState);
    setEditando(true);
  };

  const salvar = () => {
    //inclusão
    if (tipoMidia._id == null) {
      TipoMidiaSrv.incluir(tipoMidia)
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
      TipoMidiaSrv.alterar(tipoMidia)
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
    setTipoMidia(
      tiposMidias.filter((tipoMidia) => tipoMidia._id === id)[0]
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
    TipoMidiaSrv.excluir(_id)
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
        <TipoMidiaList
          tiposMidias={tiposMidias}
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
        <TipoMidiaForm
          tipoMidia={tipoMidia}
          setTipoMidia={setTipoMidia}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}

export default TipoMidiaCon;
