"use client";

import { useForm } from "@mantine/form";
import { SignupServices } from "@/app/services/signup.service";
import { useRouter } from "next/navigation";
import {
  TextInput,
  Button,
  Group,
  Radio,
  Stack,
  Paper,
  Container,
  Title,
  Text,
  Anchor,
  rem,
  Box,
  Divider,
  Select,
} from "@mantine/core";
import {
  IconUser,
  IconMail,
  IconLock,
  IconPhone,
  IconCalendar,
  IconBrandGoogle,
  IconBrandFacebook,
} from "@tabler/icons-react";
import Link from "next/link";
import { showSuccessNotification, showErrorNotification } from "@/app/components/Notification";

type SignupValues = {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
};

export default function Signup() {
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",

    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "true",
      role: "USER",
    },

    transformValues: (values) => ({
      ...values,
      gender: values.gender === "true",
    }),

    validate: {
      name: (value) => (value.trim() ? null : "Vui lòng nhập tên"),
      email: (value) => {
        // Regex kiểm tra email phải có @ và domain với dấu chấm phía sau (ví dụ: .com, .vn...)
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value) ? null : "Email không hợp lệ";
      },
      password: (value) => (value.length >= 6 ? null : "Mật khẩu phải có ít nhất 6 ký tự"),
      phone: (value) => (/^\d{10}$/.test(value) ? null : "Số điện thoại phải có 10 chữ số"),
      birthday: (value) => (value ? null : "Vui lòng nhập ngày sinh"),
    },
  });

  const handleSubmit = async (value: SignupValues) => {
    try {
      await SignupServices.signup(value);

      showSuccessNotification("Đăng ký thành công! Hãy đăng nhập để tiếp tục.", "Chào mừng bạn!");
      
      router.push("/login");
    } catch (e) {
      console.log("Signup fail:", e);
      showErrorNotification("Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.", "Đăng ký thất bại");
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
      <Container size={600} w="100%" maw="80vw" style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          shadow="xl"
          p={{ base: 25, sm: 30, md: 35 }}
          radius="lg"
          style={{
            backgroundColor: "white",
            backdropFilter: "blur(10px)",
            width: "100%",
            maxWidth: "600px",
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
            Tạo tài khoản mới
          </Title>
          
          <Text c="dimmed" size="sm" ta="center" mb={25}>
            Tham gia cộng đồng AirBnB và khám phá những trải nghiệm tuyệt vời
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
                label="Họ và tên"
                placeholder="Nguyễn Văn A"
                size="md"
                radius="md"
                key={form.key("name")}
                {...form.getInputProps("name")}
              />

              <TextInput
                leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />}
                label="Email"
                type="email"
                placeholder="example@gmail.com"
                size="md"
                radius="md"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />

              <TextInput
                leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
                label="Mật khẩu"
                type="password"
                placeholder="Ít nhất 6 ký tự"
                size="md"
                radius="md"
                key={form.key("password")}
                {...form.getInputProps("password")}
              />

              <Group grow>
                <TextInput
                  leftSection={<IconPhone style={{ width: rem(16), height: rem(16) }} />}
                  label="Số điện thoại"
                  placeholder="0123456789"
                  size="md"
                  radius="md"
                  key={form.key("phone")}
                  {...form.getInputProps("phone")}
                />

                <TextInput
                  leftSection={<IconCalendar style={{ width: rem(16), height: rem(16) }} />}
                  label="Ngày sinh"
                  type="date"
                  size="md"
                  radius="md"
                  key={form.key("birthday")}
                  {...form.getInputProps("birthday")}
                />
              </Group>

              <Radio.Group
                label="Giới tính"
                key={form.key("gender")}
                {...form.getInputProps("gender")}
              >
                <Group mt="md">
                  <Radio value="true" label="Nam" size="md" />
                  <Radio value="false" label="Nữ" size="md" />
                </Group>
              </Radio.Group>

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
              >
                Đăng ký
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
              Đăng ký với Google
            </Button>
            
            <Button
              variant="outline"
              leftSection={<IconBrandFacebook style={{ width: rem(16), height: rem(16) }} />}
              fullWidth
              size="md"
              radius="md"
              style={{ height: "42px" }}
            >
              Đăng ký với Facebook
            </Button>
          </Stack>

          <Text ta="center" mt="lg" size="sm">
            Đã có tài khoản?{" "}
            <Anchor
              component={Link}
              href="/login"
              fw={700}
              c="blue"
            >
              Đăng nhập ngay
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}
