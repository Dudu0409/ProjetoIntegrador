import axios from "../../services/axios-common";
class LoginSrv {
  url = "/loginPublic";
  async login(data) {
    return await axios.post(this.url, data).catch((err) => {
      throw err;
    });
  }
}
export default new LoginSrv();
