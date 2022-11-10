import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const ProdutoList = (props) => {
  const imagemTemplate = (rowData) => {
    const imagem = rowData.imagem;
    return (
      <React.Fragment>
        <img
          alt="img"
          src={imagem}
          width={32}
          style={{ verticalAlign: "middle" }}
        />
      </React.Fragment>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(rowData.dataLancamento));
  };

  return (
    <div className="App">
      <h4>Listagem de Produtos</h4>
      <div style={{ margin: "10px" }}>
        <Button
          type="button"
          icon="pi pi-refresh"
          className="p-button-rounded p-button-info"
          onClick={props.onClickAtualizar}
        ></Button>
        <span> </span>
        <Button
          type="button"
          icon="pi pi-plus-circle"
          className="p-button-rounded p-button-info"
          onClick={props.inserir}
        ></Button>
      </div>

      <div className="card">
        <DataTable
          value={props.produtos}
          paginator
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords}"
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          selectionMode="single"
          selection={props.produto}
          onSelectionChange={(e) => props.setProduto(e.value)}
        >
          <Column field="imagem" header="Capa" body={imagemTemplate}></Column>
          <Column field="titulo" header="Título" sortable filter></Column>
          <Column field="resumo" header="Resumo" sortable></Column>
          <Column
            field="restricaoIdade"
            header="Restrição de Idade"
            sortable
          ></Column>
          <Column
            field="numeroCronologico"
            header="Número Cronológico"
            sortable
          ></Column>
          <Column
            field="dataLancamento"
            header="Data de Lançamento"
            body={dateBodyTemplate}
            sortable
          ></Column>
          <Column
            field="tipoMidia.nome"
            header="Tipo de Mídia"
            sortable
            filter
          ></Column>
          <Column
            field="genero.descricao"
            header="Gênero"
            sortable
            filter
          ></Column>
          <Column field="autor.nome" header="Autor" sortable filter></Column>
          <Column
            header="Operações"
            body={(row) => {
              return (
                <>
                  <Button
                    type="button"
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-info"
                    onClick={() => props.editar(row._id)}
                  ></Button>
                  <span> </span>
                  <Button
                    type="button"
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-info"
                    onClick={() => props.excluir(row._id)}
                  ></Button>
                </>
              );
            }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default ProdutoList;
