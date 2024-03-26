import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const API = axios.create({ baseURL: REACT_APP_BASE_URL });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
