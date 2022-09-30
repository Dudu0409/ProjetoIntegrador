import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
const TipoMidiaList = (props) => {
  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  return (
    <div className="App">
      <h4>Listagem de Tipos de Mídia</h4>
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
          value={props.tiposMidias}
          paginator
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords}"
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
          selectionMode="single"
          selection={props.tipoMidia}
          onSelectionChange={(e) => props.setTipoMidia(e.value)}
        >
          <Column field="nome" header="Nome" sortable filter></Column>
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
export default TipoMidiaList;
