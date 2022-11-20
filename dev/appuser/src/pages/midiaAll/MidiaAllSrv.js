import axios from "../../services/axios-common";
class MidiaSrv {
  url = "/midiasPublic";
  async listar() {
    return await axios.get(this.url).catch((err) => {
      throw err;
    });
  }
  async obterPeloId(id) {
    return await axios.get(`${this.url}/${id}`).catch((err) => {
      throw err;
    });
  }
  async filtrar(filtro) {
    return await axios.get(`${this.url}/filtro/${filtro}`).catch((err) => {
      throw err;
    });
  }
}
export default new MidiaSrv();
