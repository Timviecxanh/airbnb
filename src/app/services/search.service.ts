import { Room } from "@/app/types/rooms";

const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";

export const roomService = {
  // LẤY NHIỀU PHÒNG
  getAll: async (maViTri: string): Promise<Room[]> => {
    const res = await fetch(
      `${BASE_URL}/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`,
      {
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk",
        },
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data.content; // ← mảng
  },
};
