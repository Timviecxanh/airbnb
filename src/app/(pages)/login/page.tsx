"use client";

import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Paper,
  PasswordInput,
  Text,
  Title,
  Container,
  Anchor,
  Stack,
  rem,
  Group,
  Divider,
  Box,
} from "@mantine/core";
import { authService } from "@/app/services/login.service";
import { useRouter } from "next/navigation";
import { IconUser, IconLock, IconBrandGoogle, IconBrandFacebook } from "@tabler/icons-react";
import Link from "next/link";
import { showSuccessNotification, showErrorNotification } from "@/app/components/Notification";

type LoginValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Vui lòng nhập email hợp lệ"),
      password: (value) => (value.length >= 6 ? null : "Mật khẩu phải có ít nhất 6 ký tự"),
    },
  });

  const handleSubmit = async (values: LoginValues) => {
    try {
      const res = await authService.login(values);

      localStorage.setItem("token", res.content.token);
      localStorage.setItem("user", JSON.stringify(res.content.user));
      
      showSuccessNotification("Đăng nhập thành công! Chào mừng bạn trở lại.", "Thành công");
      
      router.push("/");
      router.refresh();
    } catch (e: any) {
      console.log("Login fail:", e);
      showErrorNotification("Email hoặc mật khẩu không đúng. Vui lòng thử lại.", "Đăng nhập thất bại");
    }
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <Container size={500} w="100%" maw="80vw" style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          shadow="xl"
          p={{ base: 25, sm: 30, md: 35 }}
          radius="lg"
          style={{
            backgroundColor: "white",
            backdropFilter: "blur(10px)",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Title
            order={1}
            ta="center"
            style={{
              fontWeight: 700,
              color: "#2d3748",
              marginBottom: rem(15),
              fontSize: rem(26),
            }}
          >
            Chào mừng trở lại!
          </Title>
          
          <Text c="dimmed" size="sm" ta="center" mb={25}>
            Đăng nhập vào tài khoản AirBnB của bạn
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
                label="Email"
                placeholder="Nhập email của bạn"
                size="md"
                radius="md"
                {...form.getInputProps("email")}
              />
              
              <PasswordInput
                leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                size="md"
                radius="md"
                {...form.getInputProps("password")}
              />

              <Group justify="space-between" mt="md">
                <Anchor
                  component={Link}
                  href="/forgot-password"
                  size="sm"
                  c="blue"
                >
                  Quên mật khẩu?
                </Anchor>
              </Group>

              <Button
                type="submit"
                fullWidth
                mt="lg"
                size="md"
                radius="md"
                style={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  border: "none",
                  height: "44px",
                  fontSize: "15px",
                }}
                loading={false}
              >
                Đăng nhập
              </Button>
            </Stack>
          </form>

          <Divider label="Hoặc" labelPosition="center" my="lg" size="sm" />

          <Stack gap="md">
            <Button
              variant="outline"
              leftSection={<IconBrandGoogle style={{ width: rem(16), height: rem(16) }} />}
              fullWidth
              size="md"
              radius="md"
              style={{ height: "42px" }}
            >
              Đăng nhập với Google
            </Button>
            
            <Button
              variant="outline"
              leftSection={<IconBrandFacebook style={{ width: rem(16), height: rem(16) }} />}
              fullWidth
              size="md"
              radius="md"
              style={{ height: "42px" }}
            >
              Đăng nhập với Facebook
            </Button>
          </Stack>

          <Text ta="center" mt="lg" size="sm">
            Chưa có tài khoản?{" "}
            <Anchor
              component={Link}
              href="/signup"
              fw={700}
              c="blue"
            >
              Đăng ký ngay
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}
