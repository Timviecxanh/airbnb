"use client";

import { notifications } from "@mantine/notifications";
import { IconCheck, IconX, IconInfoCircle } from "@tabler/icons-react";
import { rem } from "@mantine/core";

export const showSuccessNotification = (message: string, title?: string) => {
  notifications.show({
    title: title || "Thành công",
    message,
    color: "green",
    icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
    autoClose: 5000,
    position: "top-right",
  });
};

export const showErrorNotification = (message: string, title?: string) => {
  notifications.show({
    title: title || "Lỗi",
    message,
    color: "red",
    icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
    autoClose: 5000,
    position: "top-right",
  });
};

export const showInfoNotification = (message: string, title?: string) => {
  notifications.show({
    title: title || "Thông tin",
    message,
    color: "blue",
    icon: <IconInfoCircle style={{ width: rem(18), height: rem(18) }} />,
    autoClose: 5000,
    position: "top-right",
  });
};