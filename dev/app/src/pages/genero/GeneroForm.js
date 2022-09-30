import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";

const GeneroForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setGenero({ ...props.genero, [name]: value });
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
          <h5 style={{ textAlign: "center" }}>Cadastro de Gêneros</h5>
          <div className="p-fluid grid formgrid">
            <div className="field col-4 md:col-4">
              <InputText
                name="descricao"
                placeholder="Descrição..."
                {...register("descricao", {
                  required: { value: true, message: "A descrição é obrigatória!" },
                  maxLength: {
                    value: 50,
                    message: "A descrição pode ter no máximo 50 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "A descrição pode ter no mínimo 2 caracteres!",
                  },
                })}
                defaultValue={props.genero.descricao}
                onChange={handleInputChange}
              />
              {errors.genero && (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {errors.genero.message}
                </span>
              )}
            </div>
          </div>       
          <div style={{ textAlign: "center" }}>
            <Button
              type="submit"
              icon="pi pi-save"
              className="p-button-rounded p-button-info"
              label="Salvar"
            ></Button>
            <span> </span>
            <Button
              type="button"
              icon="pi pi-undo"
              className="p-button-rounded p-button-info"
              label="Cancelar"
              onClick={props.cancelar}
            ></Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default GeneroForm;
