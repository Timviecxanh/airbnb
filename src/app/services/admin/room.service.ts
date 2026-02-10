import { RoomAdmin, PaginationResponse } from "@/app/types/admin";

const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk";

export const roomAdminService = {
  // Lấy tất cả phòng
  getAll: async (): Promise<RoomAdmin[]> => {
    const res = await fetch(`${BASE_URL}/phong-thue`, {
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });

    if (!res.ok) throw new Error("Không thể lấy danh sách phòng");
    const data = await res.json();
    return data.content;
  },

  // Phân trang và tìm kiếm phòng
  getPaginated: async (
    pageIndex: number = 1,
    pageSize: number = 10,
    keyword: string = ""
  ): Promise<PaginationResponse<RoomAdmin>> => {
    const res = await fetch(
      `${BASE_URL}/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`,
      {
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
        },
      }
    );

    if (!res.ok) throw new Error("Không thể lấy danh sách phòng");
    const data = await res.json();
    return data.content;
  },

  // Lấy phòng theo ID
  getById: async (id: number): Promise<RoomAdmin> => {
    const res = await fetch(`${BASE_URL}/phong-thue/${id}`, {
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });

    if (!res.ok) throw new Error("Không thể lấy thông tin phòng");
    const data = await res.json();
    return data.content;
  },

  // Lấy phòng theo vị trí
  getByLocation: async (maViTri: number): Promise<RoomAdmin[]> => {
    const res = await fetch(`${BASE_URL}/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`, {
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });

    if (!res.ok) throw new Error("Không thể lấy danh sách phòng");
    const data = await res.json();
    return data.content;
  },

  // Tạo phòng mới
  create: async (roomData: Omit<RoomAdmin, "id">, accessToken: string): Promise<RoomAdmin> => {
    const res = await fetch(`${BASE_URL}/phong-thue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
      body: JSON.stringify(roomData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.content || "Không thể tạo phòng");
    }
    const data = await res.json();
    return data.content;
  },

  // Cập nhật phòng
  update: async (id: number, roomData: Omit<RoomAdmin, "id">, accessToken: string): Promise<RoomAdmin> => {
    const res = await fetch(`${BASE_URL}/phong-thue/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
      body: JSON.stringify({ id, ...roomData }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.content || "Không thể cập nhật phòng");
    }
    const data = await res.json();
    return data.content;
  },

  // Xóa phòng
  delete: async (id: number, accessToken: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/phong-thue/${id}`, {
      method: "DELETE",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.content || "Không thể xóa phòng");
    }
  },

  // Upload hình phòng
  uploadImage: async (maPhong: number, formData: FormData, accessToken: string): Promise<RoomAdmin> => {
    const res = await fetch(`${BASE_URL}/phong-thue/upload-hinh-phong?maPhong=${maPhong}`, {
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