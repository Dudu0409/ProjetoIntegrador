import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
const UsuarioList = (props) => {
  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  const dateBodyTemplate1 = (rowData) => {
    return new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(rowData.dataNascimento));
  };
  const dateBodyTemplate2 = (rowData) => {
    return new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(rowData.dataCadastro));
  };

  return (
    <div className="App">
      <h4>Listagem de Usuários</h4>
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
          value={props.usuarios}
          paginator
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords}"
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
          selectionMode="single"
          selection={props.usuario}
          onSelectionChange={(e) => props.setUsuario(e.value)}
        >
          <Column field="nome" header="Nome" sortable filter></Column>
          <Column field="email" header="E-mail" sortable filter></Column>
          <Column
            field="dataNascimento"
            header="Data de Nascimento"
            body={dateBodyTemplate1}
            sortable
          ></Column>
          <Column
            field="dataCadastro"
            header="Data de Cadastro"
            body={dateBodyTemplate2}
            sortable
          ></Column>
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
export default UsuarioList;
