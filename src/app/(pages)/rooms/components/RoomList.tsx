"use client";

import { useEffect, useState } from "react";
import { SimpleGrid } from "@mantine/core";
import RoomCard from "./RoomCard";
import { roomService } from "@/app/services/room.service";
import { Room } from "@/app/types/rooms";

import { useRouter } from "next/navigation";
export default function RoomsList() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    roomService
      .getAll()
      .then(setRooms)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Đang tải phòng...</div>;

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
      {rooms.map((room) => (
        <div key={room.id} onClick={() => router.push(`/rooms/${room.id}`)}>
          <RoomCard room={room} />
        </div>
      ))}
    </SimpleGrid>
  );
}
