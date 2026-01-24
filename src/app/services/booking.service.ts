const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk";

export const bookingService = {
  bookRoom: async (
    payload: {
      maPhong: number;
      ngayDen: string;
      ngayDi: string;
      soLuongKhach: number;
      maNguoiDung: number;
    },
    accessToken: string,
  ) => {
    const res = await fetch(`${BASE_URL}/dat-phong`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        TokenCybersoft: TOKEN_CYBERSOFT,
        // QUAN TRỌNG: API Cybersoft yêu cầu header tên là 'token'
        token: accessToken,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // Đọc lỗi chi tiết từ server để biết tại sao 403
      const errorData = await res.json();
      throw new Error(errorData.content || "Đặt phòng thất bại");
    }

    return res.json();
  },

  getHistoryByUser: async (userId: number, accessToken: string) => {
    const res = await fetch(
      `${BASE_URL}/dat-phong/lay-theo-nguoi-dung/${userId}`,
      {
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
          token: accessToken,
        },
        cache: "no-store",
      },
    );

    if (!res.ok) throw new Error("Không lấy được lịch sử");

    const data = await res.json();
    return data.content;
  },
};
