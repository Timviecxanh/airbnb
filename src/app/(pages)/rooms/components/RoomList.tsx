"use client";

import { useEffect, useState } from "react";
import { SimpleGrid, Title, Box, Container } from "@mantine/core";
import RoomCard from "./RoomCard";
import { roomService } from "@/app/services/room.service";
import { Room } from "@/app/types/rooms";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import classes from "@/app/components/Menu/card.module.scss";

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
  const getSegment = (start: number, end: number) => {
    return rooms.slice(start, end);
  };
  if (loading) return <div>Đang tải phòng...</div>;

  return (
    <Container size="xl" py="">
      <Box mb={10} mt={30}>
        <div className={classes.statusWrapper}>
          <Title order={2} mb="xs" fw={600}>
            Còn phòng tại Đà Lạt vào cuối tuần tới{" "}
            <IconArrowNarrowRight
              className={classes.arrowicons}
              size={20}
              stroke={2.5}
            />
          </Title>
        </div>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4, lg: 6 }} spacing="md">
          {getSegment(6, 12).map((room) => (
            <div key={room.id} onClick={() => router.push(`/rooms/${room.id}`)}>
              <RoomCard room={room} />
            </div>
          ))}
        </SimpleGrid>
      </Box>
      <Box mb={10}>
        <Title order={2} mb="xs" fw={600}>
          Chỗ ở tại Vũng Tàu{" "}
          <IconArrowNarrowRight
            className={classes.arrowicons}
            size={20}
            stroke={2.5}
          />
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4, lg: 6 }} spacing="md">
          {getSegment(12, 18).map((room) => (
            <div key={room.id} onClick={() => router.push(`/rooms/${room.id}`)}>
              <RoomCard room={room} />
            </div>
          ))}
        </SimpleGrid>
      </Box>
      <Box mb={10}>
        <Title order={2} mb="xs" fw={600}>
          Còn phòng tại Đà Nẵng vào tháng tới{" "}
          <IconArrowNarrowRight
            className={classes.arrowicons}
            size={20}
            stroke={2.5}
          />
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4, lg: 6 }} spacing="md">
          {getSegment(18, 24).map((room) => (
            <div key={room.id} onClick={() => router.push(`/rooms/${room.id}`)}>
              <RoomCard room={room} />
            </div>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { SimpleGrid, Title, Container, Box } from "@mantine/core";
// import RoomCard from "./RoomCard";
// import { roomService } from "@/app/services/room.service";
// import { Room } from "@/app/types/rooms";
// import { useRouter } from "next/navigation";

// export default function RoomsList() {
//   const router = useRouter();
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     roomService
//       .getAll()
//       .then(setRooms)
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   const getSegment = (start: number, end: number) => {
//     return rooms.slice(start, end);
//   };

//   if (loading) return <div>Đang tải phòng...</div>;

//   return (
//     <Container size="xl" py="">
//       <Box mb={20}>
//         <Title order={2} mb="lg">
//           Nơi lưu trú được ưa chuộng tại Hà Nội
//         </Title>
//         <SimpleGrid cols={{ base: 1, sm: 2, md: 4, lg: 6 }} spacing="md">
//           {getSegment(0, 6).map((room) => (
//             <div key={room.id} onClick={() => router.push(`/rooms/${room.id}`)}>
//               <RoomCard room={room} />
//             </div>
//           ))}
//         </SimpleGrid>
//       </Box>

//       <Box mb={40}>
//         <Title order={2} mb="lg">
//           Còn phòng tại Đà Lạt vào cuối tuần tới
//         </Title>
//         <SimpleGrid cols={{ base: 1, sm: 2, md: 4, lg: 6 }} spacing="md">
//           {getSegment(0, 1).map((room) => (
//             <div key={room.id} onClick={() => router.push(`/rooms/${room.id}`)}>
//               <RoomCard room={room} />
//             </div>
//           ))}
//         </SimpleGrid>
//       </Box>
//     </Container>
//   );
