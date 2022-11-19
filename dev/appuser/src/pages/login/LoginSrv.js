import axios from "../../services/axios-common";
class LoginSrv {
  url = "/loginPublic";
  urlRegister = "/registerPublic";
  async login(data) {
    return await axios.post(this.url, data).catch((err) => {
      throw err;
    });
  }
  async register(data) {
    return await axios.post(this.urlRegister, data).catch((err) => {
      throw err;
    });
  }
}
export default new LoginSrv();
