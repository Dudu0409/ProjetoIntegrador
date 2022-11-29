import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "../../css/visual.css";

const MidiaList = (props) => {
  const imagemTemplate = (rowData) => {
    const imagem = rowData.imagem;
    if (!imagem || imagem === " ") {
      return (
        <React.Fragment>
          <div>Sem Capa</div>
        </React.Fragment>
      );
    } else {
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
    }
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
      <h4 className="textWhite">Todas as mídias</h4>
      <div style={{ margin: "10px" }}>
        <Button
          label="Atualizar"
          type="button"
          icon="pi pi-refresh"
          className="p-button-rounded"
          onClick={props.onClickAtualizar}
          style={{
            backgroundColor: "#7B73F1",
            borderColor: "#7B73F1",
          }}
        ></Button>
      </div>

      <div className="card removeBorda">
        <DataTable
          value={props.midias}
          paginator
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords}"
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          selectionMode="single"
          selection={props.midia}
          onSelectionChange={(e) => props.setMidia(e.value)}
        >
          <Column field="imagem" header="Capa" body={imagemTemplate}></Column>
          <Column field="titulo" header="Título" sortable filter></Column>
          <Column field="resumo" header="Resumo" sortable filter></Column>
          <Column
            field="restricaoIdade"
            header="Restrição de Idade"
            sortable
            filter
          ></Column>
          <Column
            field="numeroCronologico"
            header="Número Cronológico"
            sortable
            filter
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
          <Column field="notaMedia" header="Nota Média" sortable></Column>
          <Column
            header="Operações"
            body={(row) => {
              return (
                <>
                  <Button
                    type="button"
                    icon="pi pi-plus-circle"
                    className="p-button-rounded"
                    onClick={() => props.inserir(row._id)}
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
export default MidiaList;
