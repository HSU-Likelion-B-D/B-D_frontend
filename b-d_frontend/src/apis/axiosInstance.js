// axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// 매 요청마다 최신 토큰을 동적으로 설정하고,
// 로그인/소셜로그인/회원가입/토큰발급 등 인증 엔드포인트에는 Authorization 헤더를 제거합니다.
api.interceptors.request.use((config) => {
  const accessToken = (() => {
    try {
      return localStorage.getItem("accessToken");
    } catch {
      return null;
    }
  })();

  const url = config.url || "";
  const isAuthEndpoint =
    url.includes("/bd/user/signup") ||
    url.includes("/bd/user/profile") ||
    url.includes("/bd/user/check-email") ||
    url.includes("/bd/user/check-nickname") ||
    url.includes("/bd/user/verifycode") ||
    url.includes("/bd/user/sendcode") ||
    url.includes("/bd/user/signin");

  if (!config.headers) config.headers = {};

  if (accessToken && !isAuthEndpoint) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default api;
