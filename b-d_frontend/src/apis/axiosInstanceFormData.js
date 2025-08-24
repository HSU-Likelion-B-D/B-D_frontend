import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 기본 URL 설정
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default api;
