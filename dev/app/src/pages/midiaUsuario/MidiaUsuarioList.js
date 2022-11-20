import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "../../css/visual.css";

const MidiaUsuarioList = (props) => {
  return (
    <div className="App">
      <h4 className="textWhite">Listagem de Mídias de Usuários</h4>
      <div style={{ margin: "10px" }}>
        <Button
          type="button"
          icon="pi pi-refresh"
          className="p-button-rounded"
          onClick={props.onClickAtualizar}
          style={{
            backgroundColor: "#7B73F1",
            borderColor: "#7B73F1",
          }}
        ></Button>
        <span> </span>
        <Button
          type="button"
          icon="pi pi-plus-circle"
          className="p-button-rounded"
          onClick={props.inserir}
          style={{
            backgroundColor: "#7B73F1",
            borderColor: "#7B73F1",
          }}
        ></Button>
      </div>

      <div className="card removeBorda">
        <DataTable
          value={props.midiasUsuarios}
          paginator
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords}"
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          selectionMode="single"
          selection={props.midiaUsuario}
          onSelectionChange={(e) => props.setMidiaUsuario(e.value)}
        >
          <Column field="midia.titulo" header="Mídia" sortable filter></Column>
          <Column field="status" header="Status" sortable filter></Column>
          <Column field="favorito" header="Favorito" sortable filter></Column>
          <Column field="nota" header="Nota" sortable filter></Column>
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
                    className="p-button-rounded"
                    onClick={() => props.editar(row._id)}
                    style={{
                      backgroundColor: "#7B73F1",
                      borderColor: "#7B73F1",
                    }}
                  ></Button>
                  <span> </span>
                  <Button
                    type="button"
                    icon="pi pi-trash"
                    className="p-button-rounded"
                    onClick={() => props.excluir(row._id)}
                    style={{
                      backgroundColor: "#7B73F1",
                      borderColor: "#7B73F1",
                    }}
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
export default MidiaUsuarioList;
