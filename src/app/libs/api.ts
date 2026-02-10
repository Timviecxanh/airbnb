import axios, { type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window === "undefined") return config;

  const user = localStorage.getItem("USER_ADMIN");
  const accessToken = user ? JSON.parse(user).accessToken : "";

  config.headers.set(
    "TokenCybersoft",
    process.env.NEXT_PUBLIC_CYBERSOFT_TOKEN!
  );

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});
