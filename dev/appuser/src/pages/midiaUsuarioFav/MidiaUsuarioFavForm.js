import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";

const MidiaUsuarioForm = (props) => {
  const favoritoOptions = ["Não", "Sim"];
  const statusOptions = ["Interesse", "Assistindo", "Concluído"];
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setMidiaUsuario({ ...props.midiaUsuario, [name]: value });
  };

  const { handleSubmit } = useForm();
  const onSubmit = (data) => {
    props.salvar();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div>
          <h5 className="textWhite" style={{ textAlign: "center" }}>
            Alterar minhas mídias favoritas
          </h5>
          <p />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <Dropdown
                className="inputDark"
                name="status"
                placeholder="Status..."
                value={props.midiaUsuario.status}
                options={statusOptions}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <Dropdown
                className="inputDark"
                name="favorito"
                placeholder="Favorito..."
                value={props.midiaUsuario.favorito}
                options={favoritoOptions}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <InputText
                name="nota"
                placeholder="Nota..."
                defaultValue={props.midiaUsuario.nota}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            <Button
              type="submit"
              icon="pi pi-save"
              className="p-button-rounded"
              label="Salvar"
              style={{
                backgroundColor: "#7B73F1",
                borderColor: "#7B73F1",
              }}
            ></Button>
            <span> </span>
            <Button
              type="button"
              icon="pi pi-undo"
              className="p-button-rounded"
              label="Cancelar"
              onClick={props.cancelar}
              style={{
                backgroundColor: "#7B73F1",
                borderColor: "#7B73F1",
              }}
            ></Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default MidiaUsuarioForm;
