import { Room } from "@/app/types/rooms";

const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";

export const roomService = {
  getAll: async (): Promise<Room[]> => {
    try {
      const res = await fetch(`${BASE_URL}/phong-thue`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "TokenCybersoft": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNTQiLCJIZXRIYW5TdHJpbmciOiIxMi8wOS8yMDI2IiwiSGV0SGFuVGltZSI6IjE3ODkxNzEyMDAwMDAiLCJuYmYiOjE3Njk1MzMyMDAsImV4cCI6MTc4OTMxODgwMH0.kXgNO5andOwUXuew12iAZeNoWWzbEynHBTq5DxARbCI"
        }
      });

      console.log("API Response Status:", res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error:", errorText);
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      console.log("API Data:", data);
      
      if (data.content && Array.isArray(data.content)) {
        return data.content;
      } else {
        console.error("Unexpected data format:", data);
        return [];
      }
    } catch (error) {
      console.error("Room Service Error:", error);
      throw new Error("Không lấy được danh sách phòng: " + error.message);
    }
  },
};
