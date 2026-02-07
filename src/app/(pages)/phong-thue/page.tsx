"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { roomService } from "@/app/services/search.service";
import { Room } from "@/app/types/rooms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RoomCard from "../rooms/components/RoomCard";
export default function PhongThuePage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const maViTri = searchParams.get("maViTri");

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    if (!maViTri) return;

    roomService.getAll(maViTri).then(setRooms);
  }, [maViTri]);

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-10">Danh sách phòng</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => router.push(`/rooms/${room.id}`)}
            style={{
              cursor: "pointer",
              background: "#fff",
              borderRadius: "24px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              padding: "24px",
              marginBottom: "24px"
            }}
          >
            <RoomCard room={room} />
          </div>
        ))}
      </div>
    </div>
  );
}
