import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import LoginSrv from "./LoginSrv";

const LoginForm = (props) => {
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setCredenciais({ ...credenciais, [id]: value });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toastRef = useRef();
  const [credenciais, setCredenciais] = useState({ email: "", senha: "" });
  const onSubmit = (data) => {
    LoginSrv.login(credenciais)
      .then((response) => {
        let token = response.data;
        if (token) {
          sessionStorage.setItem("token", token);
          window.location = "/";
        } else {
          toastRef.current.show({
            severity: "error",
            summary: "Erro no login",
            life: 5000,
          });
        }
      })
      .catch(({ response }) => {
        toastRef.current.show({
          severity: "error",
          summary: response.data,
          life: 5000,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Toast ref={toastRef} />
      <div
        className="div"
        style={{
          width: "200px",
          textAlign: "center",
          marginLeft: "40%",
          marginTop: "15%",
        }}
      >
        <div className="p-fluid grid formgrid">
          <div className="field col-12 md:col-12">
            <InputText
              placeholder="E-mail..."
              type={"text"}
              id="email"
              className="p-inputtext-sm block mb-2"
              {...register("email", {
                required: { value: true, message: "E-mail é obrigatório!" },
                minLength: { value: 2, message: "Tamanho mínimo é 2" },
              })}
              defaultValue={credenciais.email}
              onKeyUp={handleInputChange}
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email.message}</span>
            )}
          </div>
          <div className="field col-12 md:col-12">
            <InputText
              placeholder="Senha..."
              type={"password"}
              id="senha"
              className="p-inputtext-sm block mb-2"
              {...register("senha", {
                required: { value: true, message: "Senha é obrigatória" },
                minLength: { value: 2, message: "Tamanho mínimo é 2" },
              })}
              defaultValue={credenciais.senha}
              onKeyUp={handleInputChange}
            />
            {errors.senha && (
              <span style={{ color: "red" }}>{errors.senha.message}</span>
            )}
          </div>
        </div>
        <br />
        <Button
          icon="pi pi-sign-in"
          type="submit"
          label="Login"
          className="p-button-rounded p-button-info"
        />
      </div>
    </form>
  );
};
export default LoginForm;
