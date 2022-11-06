import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
const ProdutoUsuarioList = (props) => {
  return (
    <div className="App">
      <h4>Listagem de Produtos Usuários</h4>
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
          value={props.produtosUsuarios}
          paginator
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords}"
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          selectionMode="single"
          selection={props.produtoUsuario}
          onSelectionChange={(e) => props.setProdutoUsuario(e.value)}
        >
          <Column field="status" header="Status" sortable filter></Column>
          <Column field="favorito" header="Favorito" dataType=""></Column>
          <Column field="nota" header="Nota" sortable></Column>
          <Column
            field="produto.titulo"
            header="Produto"
            sortable
            filter
          ></Column>
          <Column
            field="usuario.nome"
            header="Usuário"
            sortable
            filter
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
export default ProdutoUsuarioList;
