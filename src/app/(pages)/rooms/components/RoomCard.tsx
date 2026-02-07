"use client";

import { Card, Image, Badge, Group, Text, Rating } from "@mantine/core";
import { IconHeart, IconWifi, IconPool, IconCar, IconUsers } from "@tabler/icons-react";
import classes from "@/app/components/Menu/card.module.scss";
import { Room } from "@/app/types/rooms";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <Card
      className={classes.card}
      shadow="lg"
      radius="lg"
      withBorder
      style={{ transition: "box-shadow 0.2s", minHeight: 350 }}
    >
      <Card.Section className={classes.cardSection}>
        <Image
          height={220}
          src={room.hinhAnh}
          alt={room.tenPhong}
          className={classes.imgage}
          fallbackSrc="/loading.jpg"
        />

        <div className={classes.container}>
          <Badge 
            size="sm" 
            variant="light" 
            color="blue"
            className={classes.desc}
          >
            Yêu Thích
          </Badge>
          
          <div className={classes.icon}>
            <IconHeart size={18} />
          </div>
        </div>
      </Card.Section>

      <div className={classes.address}>
        <Text className={classes.location} lineClamp={2}>
          {room.tenPhong}
        </Text>
        
        <Group gap={4} mb={8}>
          <Rating value={4.5} size="xs" readOnly />
          <Text size="sm" color="dimmed">(4.5)</Text>
        </Group>
        
        <Group gap={8} mb={8}>
          <Group gap={4}>
            <IconUsers size={14} color="#717171" />
            <Text size="xs" color="dimmed">{room.khach} khách</Text>
          </Group>
          
          {room.wifi && (
            <Group gap={4}>
              <IconWifi size={14} color="#717171" />
              <Text size="xs" color="dimmed">WiFi</Text>
            </Group>
          )}
          
          {room.beBoi && (
            <Group gap={4}>
              <IconPool size={14} color="#717171" />
              <Text size="xs" color="dimmed">Bể bơi</Text>
            </Group>
          )}
          
          {room.doXe && (
            <Group gap={4}>
              <IconCar size={14} color="#717171" />
              <Text size="xs" color="dimmed">Đỗ xe</Text>
            </Group>
          )}
        </Group>
        
        <Text className={classes.price}>
          <Text span fw={700} c="dark">
            ₫{room.giaTien.toLocaleString()}
          </Text>
          <Text span c="dimmed"> / đêm</Text>
        </Text>
      </div>
    </Card>
  );
}
