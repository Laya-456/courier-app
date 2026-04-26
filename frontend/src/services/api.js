import axios from "axios";

const rawBaseUrl = process.env.REACT_APP_API_URL?.trim();
const baseURL = rawBaseUrl
  ? rawBaseUrl.replace(/\/+$/, "")
  : "/api";

// ✅ CREATE AXIOS INSTANCE (THIS WAS MISSING)
const api = axios.create({
  baseURL,
  withCredentials: true,
});

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("courier_user");
      localStorage.removeItem("courier_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;