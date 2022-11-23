import axios from "../../services/axios-common";
class UsuarioSrv {
  url = "/usuariosPublic";
  async incluir(data) {
    return await axios.post(this.url, data).catch((err) => {
      throw err;
    });
  }
}
export default new UsuarioSrv();
