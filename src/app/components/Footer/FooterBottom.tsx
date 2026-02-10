"use client";
import { Group, Text, Anchor } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import classes from "./footer.module.scss";

export function FooterBottom() {
  return (
    <Group
      justify="space-between"
      align="center"
      className={classes.footerBottom}
    >
      <Group gap="xs">
        <Text size="sm" c="dimmed">
          © 2026 Airbnb Clone
        </Text>

        <Text size="sm" c="dimmed">
          ·
        </Text>
        <Anchor className={classes.bottomLink}>Quyền riêng tư</Anchor>

        <Text size="sm" c="dimmed">
          ·
        </Text>
        <Anchor className={classes.bottomLink}>Điều khoản</Anchor>

        <Text size="sm" c="dimmed">
          ·
        </Text>
      </Group>

      <Group gap="md">
        <Group gap={4} className={classes.language}>
          <IconWorld size={16} />
          <Text size="sm">Tiếng Việt (VN)</Text>
        </Group>

        <Text size="sm">₫ VND</Text>
      </Group>
    </Group>
  );
}
