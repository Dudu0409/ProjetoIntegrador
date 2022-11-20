import axios from "../../services/axios-common";
class MidiaUsuarioSrv {
  url = "/midiasusuariosPublic";
  async listar() {
    return await axios.get(this.url).catch((err) => {
      throw err;
    });
  }
  async incluir(data) {
    return await axios.post(this.url, data).catch((err) => {
      throw err;
    });
  }
  async alterar(data) {
    return await axios.put(this.url, data).catch((err) => {
      throw err;
    });
  }
  async excluir(id) {
    return await axios.delete(`${this.url}/${id}`).catch((err) => {
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
  async listarUsuario(id) {
    return await axios.get(`${this.url}/listusuario/${id}`).catch((err) => {
      throw err;
    });
  }
  async notaMedia(id) {
    let nota = await axios.get(`${this.url}/notamedia/${id}`).catch((err) => {
      throw err;
    });
    return nota;
  }
}
export default new MidiaUsuarioSrv();
