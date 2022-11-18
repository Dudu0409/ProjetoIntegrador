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
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div
          className="textWhite"
          style={{
            width: "40%",
            textAlign: "center",
            marginTop: "5%",
            marginRight: "5%",
            marginLeft: "5%",
            marginBottom: "5%",
            paddingTop: "5%",
            paddingInline: "5%",
            paddingBottom: "5%",
          }}
        >
          <h2>
            Login
          </h2>
          <br />
          <div className="p-fluid grid formgrid">
            <div className="field col-12 md:col-6">
              <InputText
                placeholder="E-mail..."
                type={"text"}
                id="email"
                className="p-inputtext-sm block mb-2 inputDark"
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
            <br />
            <div className="field col-12 md:col-6">
              <InputText
                placeholder="Senha..."
                type={"password"}
                id="senha"
                className="p-inputtext-sm block mb-2 inputDark"
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
          </div>
          <br />
          <Button
            icon="pi pi-sign-in"
            type="submit"
            label="Acessar"
            className="p-button-rounded"
            style={{
              width: "40%",
              backgroundColor: "#7B73F1", 
              borderColor: "#7B73F1"
            }}
          />
        </div>
      </div>
    </form>
  );
};
export default LoginForm;
