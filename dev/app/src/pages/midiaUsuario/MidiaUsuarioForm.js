import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { AutoComplete } from "primereact/autocomplete";
import MidiaSrv from "../midia/MidiaSrv";
import UsuarioSrv from "../usuario/UsuarioSrv";
import { Dropdown } from "primereact/dropdown";

const MidiaUsuarioForm = (props) => {
  const favoritoOptions = ["Não", "Sim"];
  const statusOptions = ["Interesse", "Assistindo", "Concluído"];
  const [midias, setMidias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setMidiaUsuario({ ...props.midiaUsuario, [name]: value });
  };

  useEffect(() => {
    onClickAtualizarMidia();
    onClickAtualizarUsuario();
  }, []);

  const onClickAtualizarMidia = () => {
    MidiaSrv.listar()
      .then((response) => {
        setMidias(response.data);
      })
      .catch(() => {});
  };

  const onClickAtualizarUsuario = () => {
    UsuarioSrv.listar()
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch(() => {});
  };

  const {
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    props.salvar();
  };
  const [filteredMidias, setFilteredMidias] = useState(null);
  const [filteredUsuarios, setFilteredUsuarios] = useState(null);

  const searchMidia = (event) => {
    setTimeout(() => {
      let _filteredMidias;
      if (!event.query.trim().length) {
        _filteredMidias = [...midias];
      } else {
        _filteredMidias = midias.filter((midia) => {
          return midia.titulo
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredMidias(_filteredMidias);
    }, 250);
  };
  const searchUsuario = (event) => {
    setTimeout(() => {
      let _filteredUsuarios;
      if (!event.query.trim().length) {
        _filteredUsuarios = [...usuarios];
      } else {
        _filteredUsuarios = usuarios.filter((usuario) => {
          return usuario.nome
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredUsuarios(_filteredUsuarios);
    }, 250);
  };

  const itemTemplate1 = (item) => {
    return (
      <div>
        <div>{item.titulo}</div>
      </div>
    );
  };
  const itemTemplate2 = (item) => {
    return (
      <div>
        <div>{item.nome}</div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div>
          <h5 className="textWhite" style={{ textAlign: "center" }}>
            Cadastro de Mídias de Usuários
          </h5>
          <p />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <Dropdown
                className="inputDark"
                name="status"
                placeholder="Status..."
                value={props.midiaUsuario.status}
                options={statusOptions}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <Dropdown
                className="inputDark"
                name="favorito"
                placeholder="Favorito..."
                value={props.midiaUsuario.favorito}
                options={favoritoOptions}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <InputText
                name="nota"
                placeholder="Nota..."
                defaultValue={props.midiaUsuario.nota}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <AutoComplete
                name="midia"
                value={props.midiaUsuario.midia}
                suggestions={filteredMidias}
                completeMethod={searchMidia}
                onChange={handleInputChange}
                field="titulo"
                dropdown
                forceSelection
                itemTemplate={itemTemplate1}
                placeholder="Mídia..."
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <AutoComplete
                name="usuario"
                value={props.midiaUsuario.usuario}
                suggestions={filteredUsuarios}
                completeMethod={searchUsuario}
                onChange={handleInputChange}
                field="nome"
                dropdown
                forceSelection
                itemTemplate={itemTemplate2}
                placeholder="Usuário..."
              />
            </div>
          </div>
          <br />
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
export default MidiaUsuarioForm;
