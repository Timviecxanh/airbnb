"use client";
import { SimpleGrid, Text, UnstyledButton, Container } from "@mantine/core";
import classes from "./footer.module.scss";
import { locations } from "./data";
import React from "react";

export function LocationsGrid() {
  return (
    // <Container>
    <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing="lg">
      {locations.map((item, index) => (
        <UnstyledButton key={index} className={classes.locationItem}>
          <Text size="xm" fw={500} c="black">
            {item.name}
          </Text>
          <Text size="xs" c="dimmed">
            {item.type}
          </Text>
        </UnstyledButton>
      ))}
    </SimpleGrid>
    // </Container>
  );
}
