import { User, PaginationResponse } from "@/app/types/admin";

const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk";

export const userAdminService = {
  // Lấy danh sách users
  getAll: async (accessToken: string): Promise<User[]> => {
    const res = await fetch(`${BASE_URL}/users`, {
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
    });

    if (!res.ok) throw new Error("Không thể lấy danh sách người dùng");
    const data = await res.json();
    return data.content;
  },

  // Phân trang và tìm kiếm users
  getPaginated: async (
    pageIndex: number = 1,
    pageSize: number = 10,
    keyword: string = "",
    accessToken: string
  ): Promise<PaginationResponse<User>> => {
    const res = await fetch(
      `${BASE_URL}/users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`,
      {
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
          token: accessToken,
        },
      }
    );

    if (!res.ok) throw new Error("Không thể lấy danh sách người dùng");
    const data = await res.json();
    return data.content;
  },

  // Lấy user theo ID
  getById: async (id: number, accessToken: string): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
    });

    if (!res.ok) throw new Error("Không thể lấy thông tin người dùng");
    const data = await res.json();
    return data.content;
  },

  // Tìm kiếm user theo tên
  searchByName: async (name: string, accessToken: string): Promise<User[]> => {
    const res = await fetch(`${BASE_URL}/users/search/${name}`, {
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
    });

    if (!res.ok) throw new Error("Không thể tìm kiếm người dùng");
    const data = await res.json();
    return data.content;
  },

  // Tạo user mới
  create: async (userData: Omit<User, "id">, accessToken: string): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.content || "Không thể tạo người dùng");
    }
    const data = await res.json();
    return data.content;
  },

  // Cập nhật user
  update: async (id: number, userData: Omit<User, "id">, accessToken: string): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
      body: JSON.stringify({ id, ...userData }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.content || "Không thể cập nhật người dùng");
    }
    const data = await res.json();
    return data.content;
  },

  // Xóa user
  delete: async (id: number, accessToken: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/users?id=${id}`, {
      method: "DELETE",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.content || "Không thể xóa người dùng");
    }
  },

  // Upload avatar
  uploadAvatar: async (formData: FormData, accessToken: string): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users/upload-avatar`, {
      method: "POST",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.content || "Không thể upload avatar");
    }
    const data = await res.json();
    return data.content;
  },
};