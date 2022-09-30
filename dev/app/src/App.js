import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense, lazy, useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import LoginForm from "./pages/login/LoginForm";

const Home = lazy(() => import("./pages/home/Home"));
const UsuarioCon = lazy(() => import("./pages/usuario/UsuarioCon"));
const TipoMidiaCon = lazy(() => import("./pages/tipoMidia/TipoMidiaCon"));
const GeneroCon = lazy(() => import("./pages/genero/GeneroCon"));
const AutorCon = lazy(() => import("./pages/autor/AutorCon"));
const ProdutoCon = lazy(() => import("./pages/produto/ProdutoCon"));

function App() {
  const [token, setToken] = useState([]);
    useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);
  if (!token || token <= "") {
    return <LoginForm />;
  }
  return (
    <BrowserRouter>
      <Menu />
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/usuarios" element={<UsuarioCon />} />
          <Route path="/tiposmidias" element={<TipoMidiaCon />} />
          <Route path="/generos" element={<GeneroCon />} />
          <Route path="/autores" element={<AutorCon />} />
          <Route path="/produtos" element={<ProdutoCon />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function Menu() {
  let navigate = useNavigate();
  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Cadastros",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Usuários",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/usuarios");
          },
        },
        {
          label: "Tipos de Mídia",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/tiposmidias");
          },
        },
        {
          label: "Gêneros",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/generos");
          },
        },
        {
          label: "Autores",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/autores");
          },
        },
        {
          label: "Produtos",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/produtos");
          },
        },
      ],
    },
    {
      label: "Sair",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        sessionStorage.setItem("token", "");
      },
      url: "/",
    },
  ];

  return <Menubar model={items} />;
}

export default App;