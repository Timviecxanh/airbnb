import { Location, PaginationResponse } from "@/app/types/admin";

const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk";

export const locationAdminService = {
  // Lấy tất cả vị trí
  getAll: async (): Promise<Location[]> => {
    const res = await fetch(`${BASE_URL}/vi-tri`, {
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });

    if (!res.ok) throw new Error("Không thể lấy danh sách vị trí");
    const data = await res.json();
    return data.content;
  },

  // Phân trang và tìm kiếm vị trí
  getPaginated: async (
    pageIndex: number = 1,
    pageSize: number = 10,
    keyword: string = ""
  ): Promise<PaginationResponse<Location>> => {
    const res = await fetch(
      `${BASE_URL}/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`,
      {
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
        },
      }
    );

    if (!res.ok) throw new Error("Không thể lấy danh sách vị trí");
    const data = await res.json();
    return data.content;
  },

  // Lấy vị trí theo ID
  getById: async (id: number): Promise<Location> => {
    const res = await fetch(`${BASE_URL}/vi-tri/${id}`, {
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });

    if (!res.ok) throw new Error("Không thể lấy thông tin vị trí");
    const data = await res.json();
    return data.content;
  },

  // Tạo vị trí mới
  create: async (locationData: Omit<Location, "id">, accessToken: string): Promise<Location> => {
    const res = await fetch(`${BASE_URL}/vi-tri`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
      body: JSON.stringify(locationData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.content || "Không thể tạo vị trí");
    }
    const data = await res.json();
    return data.content;
  },

  // Cập nhật vị trí
  update: async (id: number, locationData: Omit<Location, "id">, accessToken: string): Promise<Location> => {
    const res = await fetch(`${BASE_URL}/vi-tri/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
      body: JSON.stringify({ id, ...locationData }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.content || "Không thể cập nhật vị trí");
    }
    const data = await res.json();
    return data.content;
  },

  // Xóa vị trí
  delete: async (id: number, accessToken: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/vi-tri/${id}`, {
      method: "DELETE",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.content || "Không thể xóa vị trí");
    }
  },

  // Upload hình vị trí
  uploadImage: async (viTriId: number, formData: FormData, accessToken: string): Promise<Location> => {
    const res = await fetch(`${BASE_URL}/vi-tri/upload-hinh-vitri?maViTri=${viTriId}`, {
      method: "POST",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.content || "Không thể upload hình ảnh");
    }
    const data = await res.json();
    return data.content;
  },
};