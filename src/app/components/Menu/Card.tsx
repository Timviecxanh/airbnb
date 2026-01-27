"use client";

import { Card, Image } from "@mantine/core";
import classes from "./card.module.scss";
import { IconHeart } from "@tabler/icons-react";
export default function Demo() {
  return (
    <Card
      className={classes.card}
      classNames={{
        section: classes.cardSection,
      }}
    >
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          // height={160}
          alt="Norway"
          className={classes.imgage}
        />

        <div className={classes.container}>
          <div className={classes.desc}>Được Khách Yêu Thích</div>
          {/* <div className={classes.icon}>
            <IconHeart size={20} />
          </div> */}
        </div>

        <div>
          <ul className={classes.address}>
            <li className={classes.location}>Nơi ở tại Quận Đống Đa </li>
            <li className={classes.price}>₫1.304.713 cho 2 đêm 5,0 Căn ₫1.6</li>
          </ul>
        </div>
      </Card.Section>
    </Card>
  );
}
