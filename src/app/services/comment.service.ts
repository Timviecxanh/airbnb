import { Comment, CommentRequest, CommentUpdate } from "@/app/types/comments";

const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk";

export const commentService = {
  // Lấy tất cả bình luận
  getAll: async (): Promise<Comment[]> => {
    const res = await fetch(`${BASE_URL}/binh-luan`, {
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Không thể lấy danh sách bình luận");
    }

    const data = await res.json();
    return data.content;
  },

  // Lấy bình luận theo phòng
  getByRoom: async (maPhong: number): Promise<Comment[]> => {
    const res = await fetch(
      `${BASE_URL}/binh-luan/lay-binh-luan-theo-phong/${maPhong}`,
      {
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Không thể lấy bình luận của phòng");
    }

    const data = await res.json();
    return data.content;
  },

  // Thêm bình luận mới
  create: async (commentData: CommentRequest, accessToken: string): Promise<Comment> => {
    const res = await fetch(`${BASE_URL}/binh-luan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
      body: JSON.stringify(commentData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.content || "Không thể thêm bình luận");
    }

    const data = await res.json();
    return data.content;
  },

  // Cập nhật bình luận
  update: async (
    id: number,
    commentData: CommentUpdate,
    accessToken: string
  ): Promise<Comment> => {
    const res = await fetch(`${BASE_URL}/binh-luan/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
      body: JSON.stringify(commentData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.content || "Không thể cập nhật bình luận");
    }

    const data = await res.json();
    return data.content;
  },

  // Xóa bình luận
  delete: async (id: number, accessToken: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/binh-luan/${id}`, {
      method: "DELETE",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        token: accessToken,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.content || "Không thể xóa bình luận");
    }
  },
};