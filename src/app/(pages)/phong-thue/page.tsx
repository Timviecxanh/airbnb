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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Danh sách phòng</h1>

      <div className="grid grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} onClick={() => router.push(`/rooms/${room.id}`)}>
            <RoomCard room={room} />
          </div>
        ))}
      </div>
    </div>
  );
}
