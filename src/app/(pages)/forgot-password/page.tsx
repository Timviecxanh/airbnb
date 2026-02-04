"use client";

import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Paper,
  Container,
  Title,
  Text,
  Anchor,
  rem,
  Box,
  Stack,
} from "@mantine/core";
import { IconMail, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { showSuccessNotification, showErrorNotification } from "@/app/components/Notification";

type ForgotPasswordValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordValues>({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Vui lòng nhập email hợp lệ"),
    },
  });

  const handleSubmit = async (values: ForgotPasswordValues) => {
    try {
      // TODO: Implement forgot password service
      console.log("Forgot password for:", values.email);
      showSuccessNotification(
        "Chúng tôi đã gửi hướng dẫn khôi phục mật khẩu vào email của bạn.",
        "Email đã được gửi"
      );
    } catch (e: any) {
      console.log("Forgot password fail:", e);
      showErrorNotification(
        "Có lỗi xảy ra. Vui lòng thử lại sau.",
        "Gửi email thất bại"
      );
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
        padding: "20px",
      }}
    >
      <Container size={420} my={40}>
        <Paper
          shadow="xl"
          p={30}
          radius="lg"
          style={{
            backgroundColor: "white",
            backdropFilter: "blur(10px)",
          }}
        >
          <Title
            order={2}
            ta="center"
            style={{
              fontWeight: 700,
              color: "#2d3748",
              marginBottom: rem(15),
            }}
          >
            Quên mật khẩu?
          </Title>
          
          <Text c="dimmed" size="sm" ta="center" mb={30}>
            Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />}
                label="Email"
                placeholder="Nhập email của bạn"
                size="md"
                radius="md"
                {...form.getInputProps("email")}
              />

              <Button
                type="submit"
                fullWidth
                mt="md"
                size="md"
                radius="md"
                style={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  border: "none",
                }}
              >
                Gửi email khôi phục
              </Button>
            </Stack>
          </form>

          <Text ta="center" mt="md">
            <Anchor
              component={Link}
              href="/login"
              fw={500}
              c="blue"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: rem(8),
              }}
            >
              <IconArrowLeft style={{ width: rem(14), height: rem(14) }} />
              Quay lại đăng nhập
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}