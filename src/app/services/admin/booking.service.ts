import { BookingAdmin, PaginationResponse } from "@/app/types/admin";

const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk";

export const bookingAdminService = {
  // Lấy tất cả đặt phòng
  getAll: async (accessToken: string): Promise<BookingAdmin[]> => {
    const res = await fetch(`${BASE_URL}/dat-phong`, {
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
    });

    if (!res.ok) throw new Error("Không thể lấy danh sách đặt phòng");
    const data = await res.json();
    return data.content;
  },

  // Lấy đặt phòng theo ID
  getById: async (id: number, accessToken: string): Promise<BookingAdmin> => {
    const res = await fetch(`${BASE_URL}/dat-phong/${id}`, {
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
    });

    if (!res.ok) throw new Error("Không thể lấy thông tin đặt phòng");
    const data = await res.json();
    return data.content;
  },

  // Cập nhật đặt phòng
  update: async (id: number, bookingData: Omit<BookingAdmin, "id">, accessToken: string): Promise<BookingAdmin> => {
    const res = await fetch(`${BASE_URL}/dat-phong/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
      body: JSON.stringify({ id, ...bookingData }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.content || "Không thể cập nhật đặt phòng");
    }
    const data = await res.json();
    return data.content;
  },

  // Xóa đặt phòng
  delete: async (id: number, accessToken: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/dat-phong/${id}`, {
      method: "DELETE",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.content || "Không thể xóa đặt phòng");
    }
  },
};