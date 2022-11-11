import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { AutoComplete } from "primereact/autocomplete";
import ProdutoSrv from "../produto/ProdutoSrv";
import UsuarioSrv from "../usuario/UsuarioSrv";
import { Dropdown } from "primereact/dropdown";

const ProdutoUsuarioForm = (props) => {
  const favoritoOptions = ["Não", "Sim"];
  const statusOptions = ["Interesse", "Assistindo", "Concluído"];
  const [produtos, setProdutos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setProdutoUsuario({ ...props.produtoUsuario, [name]: value });
  };

  useEffect(() => {
    onClickAtualizarProduto();
    onClickAtualizarUsuario();
  }, []);

  const onClickAtualizarProduto = () => {
    ProdutoSrv.listar()
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((e) => {});
  };

  const onClickAtualizarUsuario = () => {
    UsuarioSrv.listar()
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((e) => {});
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    props.salvar();
  };
  const [filteredProdutos, setFilteredProdutos] = useState(null);
  const [filteredUsuarios, setFilteredUsuarios] = useState(null);

  const searchProduto = (event) => {
    setTimeout(() => {
      let _filteredProdutos;
      if (!event.query.trim().length) {
        _filteredProdutos = [...produtos];
      } else {
        _filteredProdutos = produtos.filter((produto) => {
          return produto.titulo
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredProdutos(_filteredProdutos);
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
            Cadastro de Produtos Usuários
          </h5>
          <p />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <Dropdown
                className="inputDark"
                name="status"
                placeholder="Status..."
                value={props.produtoUsuario.status}
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
                value={props.produtoUsuario.favorito}
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
                defaultValue={props.produtoUsuario.nota}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <AutoComplete
                name="produto"
                value={props.produtoUsuario.produto}
                suggestions={filteredProdutos}
                completeMethod={searchProduto}
                onChange={handleInputChange}
                field="titulo"
                dropdown
                forceSelection
                itemTemplate={itemTemplate1}
                placeholder="Produto..."
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <AutoComplete
                name="usuario"
                value={props.produtoUsuario.usuario}
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
export default ProdutoUsuarioForm;
