import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef } from "react";
import UsuarioSrv from "./UsuarioSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import LoginForm from "./LoginForm";
import Index from "./index";

function LoginCon() {
  const initialState = {
    id: null,
    nome: "",
    email: "",
    senha: "",
    dataNascimento: "",
    tipo: "Normal",
  };
  const [usuario, setUsuario] = useState(initialState);
  const [criando, setCriando] = useState(false);
  const toastRef = useRef();

  const inserir = () => {
    setUsuario(initialState);
    setCriando(true);
  };

  const salvar = () => {
    //inclusão
    if (usuario._id == null) {
      UsuarioSrv.incluir(usuario)
        .then((response) => {
          setCriando(false);
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
  const voltar = () => {
    setCriando(false);
  };
  if (!criando) {
    return (
      <div>
        <Index inserir={inserir} />
        <Toast ref={toastRef} />
      </div>
    );
  } else {
    return (
      <div>
        <LoginForm
          usuario={usuario}
          setUsuario={setUsuario}
          salvar={salvar}
          voltar={voltar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}

export default LoginCon;
