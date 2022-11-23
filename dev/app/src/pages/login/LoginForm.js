import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import LoginSrv from "./LoginSrv";
import "../../css/login.css";

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
        let token = response.data.token;
        let userNome = response.data.userNome;
        if (token) {
          sessionStorage.setItem("token", JSON.stringify(token));
          sessionStorage.setItem("userNome", JSON.stringify(userNome));
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
    <>
      <div className="container">
        <div className="container-login">
          <div className="wrap-login">
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
              <Toast ref={toastRef} />
              <span className="login-form-title"> Bem-vindo </span>
              <div className="wrap-input">
                <InputText
                  placeholder="E-mail..."
                  type={"text"}
                  id="email"
                  className="p-inputtext-sm block mb-2 inputDark input"
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

              <div className="wrap-input">
                <InputText
                  placeholder="Senha..."
                  type={"password"}
                  id="senha"
                  className="p-inputtext-sm block mb-2 inputDark input"
                  {...register("senha", {
                    required: { value: true, message: "Senha é obrigatória!" },
                    minLength: { value: 2, message: "Tamanho mínimo é 2" },
                  })}
                  defaultValue={credenciais.senha}
                  onKeyUp={handleInputChange}
                />
                {errors.senha && (
                  <span style={{ color: "red" }}>{errors.senha.message}</span>
                )}
              </div>

              <div className="container-login-form-btn">
                <Button
                  icon="pi pi-sign-in"
                  type="submit"
                  label="Login"
                  className="p-button-rounded login-form-btn"
                  style={{
                    width: "40%",
                    backgroundColor: "#7B73F1",
                    borderColor: "#7B73F1",
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
