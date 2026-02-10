"use client";

import { useEffect, useState } from "react";
import { SimpleGrid, Title, Box, Container, Text, Badge, Skeleton, Group, Button } from "@mantine/core";
import RoomCard from "./RoomCard";
import { roomService } from "@/app/services/room.service";
import { Room } from "@/app/types/rooms";
import { IconArrowNarrowRight, IconMapPin, IconStar } from "@tabler/icons-react";
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

  const SectionSkeleton = () => (
    <Box mb={60}>
      <Skeleton height={40} width={300} mb="md" />
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4, lg: 6 }} spacing="xl">
        {Array.from({ length: 6 }).map((_, index) => (
          <Box key={index}>
            <Skeleton height={220} radius="lg" mb="md" />
            <Skeleton height={20} mb="sm" />
            <Skeleton height={16} width="70%" />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );

  const RoomSection = ({ title, subtitle, rooms, icon }: {
    title: string;
    subtitle?: string;
    rooms: Room[];
    icon?: React.ReactNode;
  }) => (
    <Box mb={60}>
      <Group gap="md" mb="xl">
        <div>
          <Group gap="sm" mb="xs">
            {icon}
            <Title order={2} fw={700} size="1.75rem" c="dark">
              {title}
            </Title>
            <IconArrowNarrowRight
              className={classes.arrowicons}
              size={24}
              stroke={2.5}
            />
          </Group>
          {subtitle && (
            <Text size="md" c="dimmed" fw={500}>
              {subtitle}
            </Text>
          )}
        </div>
      </Group>
      
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }} spacing="sm">
        {rooms.map((room) => (
          <div key={room.id} onClick={() => router.push(`/rooms/${room.id}`)}>
            <RoomCard room={room} />
          </div>
        ))}
      </SimpleGrid>
    </Box>
  );

  if (loading) {
    return (
      <Container size="xl" py={80}>
        <SectionSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
      </Container>
    );
  }

  return (
    <Container size="xl" py={40}>
      <RoomSection
        title="Còn phòng tại Đà Lạt vào cuối tuần tới"
        subtitle="Thành phố ngàn hoa với khí hậu mát mẻ quanh năm"
        rooms={getSegment(6, 12)}
        icon={<IconMapPin size={24} color="#667eea" />}
      />

      <RoomSection
        title="Chỗ ở tại Vũng Tàu"
        subtitle="Bãi biển đẹp và hải sản tươi ngon"
        rooms={getSegment(12, 18)}
        icon={<IconMapPin size={24} color="#667eea" />}
      />

      <RoomSection
        title="Còn phòng tại Đà Nẵng vào tháng tới"
        subtitle="Thành phố đáng sống với nhiều cầu đẹp"
        rooms={getSegment(18, 24)}
        icon={<IconMapPin size={24} color="#667eea" />}
      />

      <Box ta="center" mt={60}>
        <Button 
          size="xl" 
          radius="xl"
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
          leftSection={<IconStar size={20} />}
          onClick={() => router.push('/rooms')}
        >
          Xem tất cả phòng
        </Button>
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
