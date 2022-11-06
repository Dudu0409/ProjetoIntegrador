import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Password } from "primereact/password";
import { Calendar } from "primereact/calendar";

const UsuarioForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setUsuario({ ...props.usuario, [name]: value });
  };

  const [contraSenha, setContraSenha] = useState();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //console.log(data);
    if (contraSenha !== props.usuario.senha) {
      setError("senha", {
        type: "custom",
        message: "Senha e contra senha são diferentes!",
      });
    } else {
      props.salvar();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div>
          <h5 style={{ textAlign: "center" }}>Cadastro de Usuários</h5>
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
                    value: 1,
                    message: "O nome pode ter no mínimo 1 caractere!",
                  },
                })}
                defaultValue={props.usuario.nome}
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
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <InputText
                name="email"
                placeholder="E-mail..."
                {...register("email", {
                  required: {
                    value: true,
                    message: "O email é obrigatório!",
                  },
                  maxLength: {
                    value: 100,
                    message: "O email pode ter no máximo 100 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "O email deve ter no mínimo 2 caracteres!",
                  },
                })}
                defaultValue={props.usuario.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <span style={{ color: "red", fontStyle: "italic" }}>
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <Password
                name="senha"
                placeholder="Senha..."
                {...register("senha", {})}
                onChange={handleInputChange}
                toggleMask
              />
              {errors.senha && (
                <span style={{ color: "red" }}>{errors.senha.message}</span>
              )}
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <Password
                name="contraSenha"
                placeholder="Repita a Senha..."
                defaultValue={contraSenha}
                onChange={(e) => setContraSenha(e.target.value)}
                toggleMask
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <InputText
                name="tipo"
                placeholder="Tipo de Usuário..."
                {...register("tipo", {
                  required: { value: true, message: "O tipo é obrigatório!" },
                  maxLength: {
                    value: 50,
                    message: "O tipo pode ter no máximo 50 caracteres!",
                  },
                  minLength: {
                    value: 1,
                    message: "O tipo pode ter no mínimo 1 caractere!",
                  },
                })}
                defaultValue={props.usuario.tipo}
                onChange={handleInputChange}
              />
              {errors.tipo && (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {errors.tipo.message}
                </span>
              )}
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <Calendar
                name="dataNascimento"
                placeholder="Data de Nascimento..."
                value={props.usuario.dataNascimento}
                onChange={handleInputChange}
                dateFormat="dd/mm/yy"
                showIcon
              />
            </div>
          </div>
          <br />
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
export default UsuarioForm;
