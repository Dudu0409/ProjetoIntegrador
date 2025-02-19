import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense, lazy, useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import LoginForm from "./pages/login/LoginForm";
import "./css/visual.css";
import "./css/menubar.css";
import Error404 from "./pages/error/404";

const Home = lazy(() => import("./pages/home/Home"));
const UsuarioCon = lazy(() => import("./pages/usuario/UsuarioCon"));
const TipoMidiaCon = lazy(() => import("./pages/tipoMidia/TipoMidiaCon"));
const GeneroCon = lazy(() => import("./pages/genero/GeneroCon"));
const AutorCon = lazy(() => import("./pages/autor/AutorCon"));
const MidiaCon = lazy(() => import("./pages/midia/MidiaCon"));
const MidiaUsuarioCon = lazy(() =>
  import("./pages/midiaUsuario/MidiaUsuarioCon")
);

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
      <Suspense fallback={<div className="textWhite">Carregando...</div>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/usuarios" element={<UsuarioCon />} />
          <Route path="/tiposMidias" element={<TipoMidiaCon />} />
          <Route path="/generos" element={<GeneroCon />} />
          <Route path="/autores" element={<AutorCon />} />
          <Route path="/midias" element={<MidiaCon />} />
          <Route path="/midiasUsuarios" element={<MidiaUsuarioCon />} />
          <Route path="*" element={<Error404 />} />
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
          icon: "pi pi-fw pi-sliders-h",
          command: () => {
            navigate("/tiposMidias");
          },
        },
        {
          label: "Gêneros",
          icon: "pi pi-fw pi-bars",
          command: () => {
            navigate("/generos");
          },
        },
        {
          label: "Autores",
          icon: "pi pi-fw pi-bookmark",
          command: () => {
            navigate("/autores");
          },
        },
        {
          label: "Mídias",
          icon: "pi pi-fw pi-book",
          command: () => {
            navigate("/midias");
          },
        },
        {
          label: "Mídias Usuários",
          icon: "pi pi-fw pi-users",
          command: () => {
            navigate("/midiasUsuarios");
          },
        },
      ],
    },
    {
      label: "Sair",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userNome");
      },
      url: "/",
    },
  ];
  let nome = sessionStorage.getItem("userNome").replace(/"/g, "");
  const end = <h2 className="textNomeUser"> {nome} </h2>;

  return <Menubar model={items} className="ui-menubar" end={end} />;
}

export default App;
