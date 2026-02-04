"use client";

import { useEffect, useState } from "react";
import { Container, Paper, Text, Button, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";

interface UserData {
  name: string;
  email: string;
  role?: string;
  id: number;
}

export default function TestUserData() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    console.log("Raw user data:", user);
    console.log("Token:", token);
    
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);
        console.log("Parsed user:", parsedUser);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  const makeAdmin = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      parsedUser.role = "ADMIN";
      localStorage.setItem("user", JSON.stringify(parsedUser));
      setUserData(parsedUser);
      alert("Đã set role thành ADMIN!");
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Paper p="xl" shadow="sm">
        <Stack gap="md">
          <Text size="xl" fw={700}>Debug User Data</Text>
          
          <Text size="lg">Dữ liệu user hiện tại:</Text>
          <pre style={{ background: "#f5f5f5", padding: "10px", borderRadius: "4px" }}>
            {userData ? JSON.stringify(userData, null, 2) : "Không có dữ liệu"}
          </pre>
          
          {userData && (
            <Stack gap="sm">
              <Text><strong>Name:</strong> {userData.name}</Text>
              <Text><strong>Email:</strong> {userData.email}</Text>
              <Text><strong>Role:</strong> {userData.role || "Không có role"}</Text>
              <Text><strong>ID:</strong> {userData.id}</Text>
            </Stack>
          )}
          
          <Button onClick={makeAdmin} color="red">
            Force Set Role = ADMIN (Test)
          </Button>
          
          <Button onClick={() => router.push("/admin")} variant="outline">
            Thử vào Admin Panel
          </Button>
          
          <Button onClick={() => router.push("/")} variant="outline">
            Về trang chủ
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}