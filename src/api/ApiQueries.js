import axios from "axios";

export const apiQueries = axios.create({
  baseURL: "http://localhost:3020/api/floreria",
});
