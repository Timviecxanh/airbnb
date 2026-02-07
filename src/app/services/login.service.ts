import {User} from "@/app/types/login"

const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api/auth/signin";

export const authService = {
  login: async (data: { email: string; password: string }) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNTQiLCJIZXRIYW5TdHJpbmciOiIxMi8wOS8yMDI2IiwiSGV0SGFuVGltZSI6IjE3ODkxNzEyMDAwMDAiLCJuYmYiOjE3Njk1MzMyMDAsImV4cCI6MTc4OTMxODgwMH0.kXgNO5andOwUXuew12iAZeNoWWzbEynHBTq5DxARbCI",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw await res.json();
    return res.json();
  },
};
