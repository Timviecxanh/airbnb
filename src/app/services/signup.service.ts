// Thêm vào file service của bạn
import {Room} from "@/app/types/rooms"
const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";

export const RoomService = {
  // Hàm lấy danh sách phòng dựa trên ID vị trí
  
  getByLocation: async (locationId: string): Promise<Room[]> => {
    const res = await fetch(
      `${BASE_URL}/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationId}`, 
      {
        headers: {
          TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // Token của bạn
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Không lấy được danh sách phòng theo vị trí này");
    }

    const data = await res.json();
    return data.content; // Trả về mảng các phòng [Room, Room, ...]
  },
};