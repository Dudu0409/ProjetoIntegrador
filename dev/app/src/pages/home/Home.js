import React from "react";
import { Button } from "primereact/button";
import "../../css/visual.css";

function Home() {
  return (
    <div className="margin textWhite">
      <h2>Bem Vindo ao Ayla Admin!</h2>
      <br />
      Aqui você poderá usar as funcionalidades de administrador do Projeto Ayla,
      desde cadastro de usuários, autores, gêneros, tipos de mídias e mídias.
      <br />
      <br />
      <a
        href="http://localhost:3002/"
        target="_blank"
        rel="noreferrer"
      >
        <Button
          type="button"
          className="p-button-rounded p-button-help"
          label="Ir para App do Usuário"
          style={{ backgroundColor: "#7B73F1", borderColor: "#7B73F1" }}
        ></Button>
      </a>
    </div>
  );
}

export default Home;
