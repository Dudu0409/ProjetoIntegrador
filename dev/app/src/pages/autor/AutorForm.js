import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";

const AutorForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setAutor({ ...props.autor, [name]: value });
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
          <h5 style={{ textAlign: "center" }}>Cadastro de Autores</h5>
          <div className="p-fluid grid formgrid">
            <div className="field col-4 md:col-4">
              <InputText
                name="nome"
                placeholder="Nome..."
                {...register("nome", {
                  required: { value: true, message: "O nome é obrigatório!" },
                  maxLength: {
                    value: 50,
                    message: "O nome pode ter no máximo 50 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "O nome pode ter no mínimo 2 caracteres!",
                  },
                })}
                defaultValue={props.autor.nome}
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
          <br />
          <div className="field col-12 md:col-4">
            <Calendar
              name="dataNascimento"
              placeholder="Data de Nascimento..."
              value={props.autor.dataNascimento}
              onChange={handleInputChange}
              dateFormat="dd-mm-yy"
              showIcon
            />
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
export default AutorForm;
