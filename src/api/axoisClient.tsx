import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://upskilling-egypt.com:3000/api/v0", 
  timeout: 5000,
});

// Request Interceptor
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;

    if (error.response?.status === 401 && token && currentPath !== "/login" && currentPath !== "/") {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;