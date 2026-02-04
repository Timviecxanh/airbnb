"use client";

import { Button, Container, Paper, Title, Text, Stack, Group } from "@mantine/core";
import { IconUserShield } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function AdminTestPage() {
  const router = useRouter();

  const createAdminUser = () => {
    const adminUser = {
      id: 999,
      name: "Admin Test",
      email: "admin@test.com",
      role: "ADMIN",
      avatar: null,
    };

    const fakeToken = "admin-test-token";

    localStorage.setItem("user", JSON.stringify(adminUser));
    localStorage.setItem("token", fakeToken);

    alert("Đã tạo user Admin test! Bây giờ bạn có thể vào Admin Panel.");
    router.push("/admin");
  };

  const loginAsUser = () => {
    const normalUser = {
      id: 1,
      name: "User Test",
      email: "user@test.com", 
      role: "USER",
      avatar: null,
    };

    localStorage.setItem("user", JSON.stringify(normalUser));
    localStorage.setItem("token", "user-test-token");

    alert("Đã login as User!");
    router.push("/");
  };

  return (
    <Container size="sm" py="xl">
      <Paper shadow="md" p="xl" radius="md">
        <Stack align="center" gap="xl">
          <IconUserShield size={64} color="#3b82f6" />
          <Title order={2} ta="center">Admin Test Helper</Title>
          
          <Text ta="center" c="dimmed">
            Trang này giúp bạn test chức năng Admin. Click button bên dưới để tạo user Admin tạm thời.
          </Text>

          <Group>
            <Button
              size="lg"
              leftSection={<IconUserShield size={20} />}
              onClick={createAdminUser}
              gradient={{ from: 'red', to: 'orange' }}
              variant="gradient"
            >
              Tạo Admin User & Vào Admin Panel
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={loginAsUser}
            >
              Login as User
            </Button>
          </Group>

          <Text size="sm" c="dimmed" ta="center">
            Hoặc truy cập trực tiếp: <br />
            <code>http://localhost:3000/admin</code>
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
}