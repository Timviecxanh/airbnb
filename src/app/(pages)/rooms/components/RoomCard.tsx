"use client";

import { Card, Image } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import classes from "@/app/components/Menu/card.module.scss";
import { Room } from "@/app/types/rooms";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <Card className={classes.card}>
      <Card.Section>
        <Image
          height={400}
          src={room.hinhAnh}
          alt={room.tenPhong}
          className={classes.imgage}
          fallbackSrc="/loading.jpg"
        />

        <div className={classes.container}>
          <div className={classes.desc}>Được Khách Yêu Thích</div>
          <div className={classes.icon}>
            <IconHeart size={20} />
          </div>
        </div>

        <ul className={classes.address}>
          <li className={classes.location}>{room.tenPhong}</li>
          <li className={classes.price}>
            ₫{room.giaTien.toLocaleString()} / đêm · {room.khach} khách
          </li>
        </ul>
      </Card.Section>
    </Card>
  );
}
