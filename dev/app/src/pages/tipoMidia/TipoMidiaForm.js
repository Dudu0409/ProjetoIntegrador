import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";

const TipoMidiaForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setTipoMidia({ ...props.tipoMidia, [name]: value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //console.log(data);
    props.salvar();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div>
          <h5 className="textWhite" style={{ textAlign: "center" }}>Cadastro de Tipos de Mídia</h5>
          <p />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <InputText
                name="nome"
                placeholder="Nome..."
                {...register("nome", {
                  required: { value: true, message: "O nome é obrigatório!" },
                  maxLength: {
                    value: 100,
                    message: "O nome pode ter no máximo 100 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "O nome pode ter no mínimo 2 caracteres!",
                  },
                })}
                defaultValue={props.tipoMidia.nome}
                onChange={handleInputChange}
              />
              {errors.nome && (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {errors.nome.message}
                </span>
              )}
            </div>
          </div>       
          <br/>
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
export default TipoMidiaForm;
