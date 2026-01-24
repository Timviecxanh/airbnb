import { Room } from "@/app/types/rooms";

const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";

export const DetailService = {
  getById: async (id: string): Promise<Room> => {
    const res = await fetch(`${BASE_URL}/phong-thue/${id}`, {
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Không lấy được danh sách phòng");
    }

    const data = await res.json();
    return data.content;
  },
};
