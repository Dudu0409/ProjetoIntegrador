import axios from "axios";
let token = JSON.parse(localStorage.getItem("token"));
export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
    "x-auth-token": token,
  },
});
