import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("bw_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("bw_token");
      localStorage.removeItem("bw_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default API;
