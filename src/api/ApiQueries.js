import axios from "axios";

// esta funcion hace peticiones mediante axios a mi backend
export const apiQueries = axios.create({
  baseURL: "http://localhost:3020/api/floreria",
});
