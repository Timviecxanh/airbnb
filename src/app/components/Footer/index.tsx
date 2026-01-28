"use client";
import { Tabs, Container, Text, Divider } from "@mantine/core";
import classes from "@/app/components/Footer/footer.module.scss";
import { FooterTabs } from "@/app/components/Footer/Footertab";
import { LocationsGrid } from "@/app/components/Footer/Gridlocatione";
import { FooterContact } from "@/app/components/Footer/FooterContact";
import { FooterBottom } from "@/app/components/Footer/FooterBottom";

export default function Footer() {
  return (
    
      <Container size="lg" className={classes.wrapper}>
        <Text fw={600} size="xll" mb="md" className={classes.title}>
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
          </Tabs.Panel>
          <Tabs.Panel value="culture" pt="xl">
            <LocationsGrid />
          </Tabs.Panel>
        </Tabs>
      </Container>
      <FooterContact />
      <FooterBottom />
    
  );
}
