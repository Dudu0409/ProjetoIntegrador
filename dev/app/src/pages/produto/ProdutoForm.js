import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { AutoComplete } from "primereact/autocomplete";
import TipoMidiaSrv from "../tipoMidia/TipoMidiaSrv";
import AutorSrv from "../autor/AutorSrv";
import GeneroSrv from "../genero/GeneroSrv";

const ProdutoForm = (props) => {
  const [tiposMidias, setTiposMidias] = useState([]);
  const [autores, setAutores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setProduto({ ...props.produto, [name]: value });
  };

  useEffect(() => {
    onClickAtualizarAutor();
    onClickAtualizarGenero();
    onClickAtualizarTipoMidia();
  }, []);

  const onClickAtualizarAutor = () => {
    AutorSrv.listar()
      .then((response) => {
        setAutores(response.data);
      })
      .catch((e) => {});
  };

  const onClickAtualizarGenero = () => {
    GeneroSrv.listar()
      .then((response) => {
        setGeneros(response.data);
      })
      .catch((e) => {});
  };

  const onClickAtualizarTipoMidia = () => {
    TipoMidiaSrv.listar()
      .then((response) => {
        setTiposMidias(response.data);
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
  const [filteredTiposMidias, setFilteredTiposMidias] = useState(null);
  const [filteredAutores, setFilteredAutores] = useState(null);
  const [filteredGeneros, setFilteredGeneros] = useState(null);

  const searchTipoMidia = (event) => {
    setTimeout(() => {
      let _filteredTiposMidias;
      if (!event.query.trim().length) {
        _filteredTiposMidias = [...tiposMidias];
      } else {
        _filteredTiposMidias = tiposMidias.filter((tipoMidia) => {
          return tipoMidia.nome
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredTiposMidias(_filteredTiposMidias);
    }, 250);
  };
  const searchAutor = (event) => {
    setTimeout(() => {
      let _filteredAutores;
      if (!event.query.trim().length) {
        _filteredAutores = [...autores];
      } else {
        _filteredAutores = autores.filter((autor) => {
          return autor.nome.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }

      setFilteredAutores(_filteredAutores);
    }, 250);
  };

  const searchGenero = (event) => {
    setTimeout(() => {
      let _filteredGeneros;
      if (!event.query.trim().length) {
        _filteredGeneros = [...generos];
      } else {
        _filteredGeneros = generos.filter((genero) => {
          return genero.descricao
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredGeneros(_filteredGeneros);
    }, 250);
  };

  const itemTemplate1 = (item) => {
    return (
      <div>
        <div>{item.descricao}</div>
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
  const itemTemplate3 = (item) => {
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
          <h5 style={{ textAlign: "center" }}>Cadastro de Produtos</h5>
          <div className="p-fluid grid formgrid">
            <div className="field col-4 md:col-4">
              <InputText
                name="titulo"
                placeholder="Título..."
                {...register("titulo", {
                  required: { value: true, message: "O título é obrigatório!" },
                  maxLength: {
                    value: 100,
                    message: "O título pode ter no máximo 100 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "O título deve ter no mínimo 2 caracteres!",
                  },
                })}
                defaultValue={props.produto.titulo}
                onChange={handleInputChange}
              />
              {errors.titulo && (
                <span style={{ color: "red", fontStyle: "italic" }}>
                  {errors.titulo.message}
                </span>
              )}
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid">
            <div className="field col-4 md:col-4">
              <InputText
                name="resumo"
                placeholder="Resumo..."
                {...register("resumo", {
                  required: {
                    value: true,
                    message: "O resumo é obrigatório!",
                  },
                  maxLength: {
                    value: 100,
                    message: "O resumo pode ter no máximo 100 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "O resumo deve ter no mínimo 2 caracteres!",
                  },
                })}
                defaultValue={props.produto.resumo}
                onChange={handleInputChange}
              />
              {errors.resumo && (
                <span style={{ color: "red", fontStyle: "italic" }}>
                  {errors.resumo.message}
                </span>
              )}
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid">
            <div className="field col-4 md:col-4">
              <InputText
                name="restricaoIdade"
                placeholder="Restrição de Idade..."
                defaultValue={props.produto.restricaoIdade}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid">
            <div className="field col-4 md:col-4">
              <Calendar
                name="dataLancamento"
                placeholder="Data de Lançamento..."
                value={props.produto.dataLancamento}
                onChange={handleInputChange}
                dateFormat="dd-mm-yy"
                showIcon
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid">
            <div className="field col-4 md:col-4">
              <InputText
                name="numeroCronologico"
                placeholder="Número Cronológico..."
                defaultValue={props.produto.numeroCronologico}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid">
            <div
              className="field col-4 md:col-4"
              style={{ textAlign: "center" }}
            >
              <AutoComplete
                name="tipoMidia"
                value={props.produto.tipoMidia}
                suggestions={filteredTiposMidias}
                completeMethod={searchTipoMidia}
                onChange={handleInputChange}
                field="nome"
                dropdown
                forceSelection
                itemTemplate={itemTemplate2}
                placeholder="Tipo de Mídia..."
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid">
            <div
              className="field col-4 md:col-4"
              style={{ textAlign: "center" }}
            >
              <AutoComplete
                name="autor"
                value={props.produto.autor}
                suggestions={filteredAutores}
                completeMethod={searchAutor}
                onChange={handleInputChange}
                field="nome"
                dropdown
                forceSelection
                itemTemplate={itemTemplate3}
                placeholder="Autor..."
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid">
            <div
              className="field col-4 md:col-4"
              style={{ textAlign: "center" }}
            >
              <AutoComplete
                name="genero"
                value={props.produto.genero}
                suggestions={filteredGeneros}
                completeMethod={searchGenero}
                onChange={handleInputChange}
                field="descricao"
                dropdown
                forceSelection
                itemTemplate={itemTemplate1}
                placeholder="Gênero..."
              />
            </div>
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
export default ProdutoForm;
