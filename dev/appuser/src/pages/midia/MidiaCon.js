import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import MidiaList from "./MidiaList";
import MidiaSrv from "./MidiaSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";

function MidiaCon() {
  const [midias, setMidias] = useState([]);
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


    return (
      <div>
        <ConfirmDialog />
        <MidiaList
          midias={midias}
          onClickAtualizar={onClickAtualizar}
        />
        <Toast ref={toastRef} />
      </div>
    );
}

export default MidiaCon;
