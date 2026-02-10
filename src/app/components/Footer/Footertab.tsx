"use client";

import { Tabs, Divider } from "@mantine/core";

export function FooterTabs() {
  return (
    <>
      <Divider my="md" />
      <Tabs.List>
        <Tabs.Tab value="popular">Phổ biến</Tabs.Tab>
        <Tabs.Tab value="culture">Văn hóa và nghệ thuật</Tabs.Tab>
        <Tabs.Tab value="beach">Bãi biển</Tabs.Tab>
        <Tabs.Tab value="mountains">Dãy núi</Tabs.Tab>
        <Tabs.Tab value="outdoor">Ngoài trời</Tabs.Tab>
        <Tabs.Tab value="experience">Những điều nên trải nghiệm</Tabs.Tab>
      </Tabs.List>
    </>
  );
}
