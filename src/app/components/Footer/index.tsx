"use client";
import { Tabs, Container, Text } from "@mantine/core";
import classes from "./footer.module.scss";
import { FooterTabs } from "./Footertab";
import { LocationsGrid } from "./Gridlocatione";

export default function Footer() {
  return (
    <Container size="lg" className={classes.wrapper}>
      <Text fw={600} size="xl" mb="md" className={classes.title}>
        Nguồn cảm hứng cho những kỳ nghỉ sau này
      </Text>

      <Tabs
        defaultValue="popular"
        classNames={{
          list: classes.tabsList,
          tab: classes.tab,
        }}
      >
        <FooterTabs />
        <Tabs.Panel value="popular" pt="xl">
          <LocationsGrid />
        </Tabs.Panel>
        <Tabs.Panel value="beach" pt="xl">
          <LocationsGrid />
        </Tabs.Panel>{" "}
        <Tabs.Panel value="culture" pt="xl">
          <LocationsGrid />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
