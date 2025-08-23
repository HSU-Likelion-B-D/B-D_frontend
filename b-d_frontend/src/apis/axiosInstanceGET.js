// axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가 - 모든 요청에 자동으로 토큰 포함
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
