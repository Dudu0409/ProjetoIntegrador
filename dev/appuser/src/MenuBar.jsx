import React, { useContext } from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/auth";

function Menu() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

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
      label: "Mídias",
      icon: "pi pi-fw pi-book",
      items: [
        {
          label: "Todas",
          command: () => {
            navigate("/midias/all");
          },
        },
        {
          label: "Todas Minhas",
          command: () => {
            navigate("/midiasUsuario/all");
          },
        },
        {
          label: "Favoritos",
          command: () => {
            navigate("/midiasUsuario/favoritos");
          },
        },
        {
          label: "Interesses",
          command: () => {
            navigate("/midiasUsuario/interesses");
          },
        },
        {
          label: "Assistindo",
          command: () => {
            navigate("/midiasUsuario/assistindo");
          },
        },
        {
          label: "Concluídas",
          command: () => {
            navigate("/midiasUsuario/concluidas");
          },
        },
      ],
    },
    {
      label: "Sair",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        handleLogout();
      },
      url: "/",
    },
  ];
  let nome = localStorage.getItem("userNome");

  if (nome === null) {
    localStorage.setItem("userNome", "Usuário");
  }
  
  const end = <h2 className="textNomeUser"> {nome.replace(/"/g, "")} </h2>;

  return <Menubar model={items} className="ui-menubar" end={end} />;
}
export default Menu;
