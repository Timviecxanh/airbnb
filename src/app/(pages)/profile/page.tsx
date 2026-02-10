"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Paper,
  Text,
  Group,
  Avatar,
  Button,
  TextInput,
  Stack,
  Modal,
  FileInput,
  Badge,
  Divider,
  Grid,
  Card,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconCalendar,
  IconEdit,
  IconUpload,
} from "@tabler/icons-react";
import { showSuccessNotification, showErrorNotification } from "@/app/components/Notification";
import AuthGuard from "@/app/components/Auth/Auth";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
  avatar?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [avatarOpened, { open: openAvatar, close: closeAvatar }] = useDisclosure(false);
  const [tripCount, setTripCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      birthday: "",
      gender: true,
    },
  });

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        form.setValues({
          name: parsedUser.name || "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
          birthday: parsedUser.birthday || "",
          gender: parsedUser.gender ?? true,
        });
        // Lấy lịch sử chuyến đi
        import("@/app/services/booking.service").then(({ bookingService }) => {
          bookingService.getHistoryByUser(parsedUser.id, parsedUser.token || "").then((history) => {
            setTripCount(Array.isArray(history) ? history.length : 0);
          }).catch(() => setTripCount(0));
        });
        // Lấy số đánh giá
        import("@/app/services/comment.service").then(({ commentService }) => {
          commentService.getAll().then((comments) => {
            const userReviews = Array.isArray(comments) ? comments.filter((c) => c.maNguoiBinhLuan === parsedUser.id) : [];
            setReviewCount(userReviews.length);
          }).catch(() => setReviewCount(0));
        });
      }
    }
  }, []);

  const handleUpdateProfile = async (values: any) => {
    try {
      // Cập nhật localStorage
      if (user && typeof window !== "undefined") {
        const updatedUser = { ...user, ...values };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        showSuccessNotification("Cập nhật thông tin thành công!");
        close();
      }
    } catch (error) {
      showErrorNotification("Có lỗi xảy ra khi cập nhật thông tin");
    }
  };

  const handleAvatarUpload = (file: File | null) => {
    if (file && user && typeof window !== "undefined") {
      // Tạo URL preview cho avatar
      const avatarUrl = URL.createObjectURL(file);
      const updatedUser = { ...user, avatar: avatarUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      showSuccessNotification("Cập nhật avatar thành công!");
      closeAvatar();
    }
  };

  if (!user) {
    return <Container><Text>Loading...</Text></Container>;
  }

  return (
    <AuthGuard>
      <Container size="lg" py="xl">
        <Title order={1} mb="xl">Thông tin tài khoản</Title>

        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            {/* Avatar và thông tin cơ bản */}
            <Paper p="xl" shadow="sm" radius="md">
              <Stack align="center" gap="md">
                <Avatar
                  src={user.avatar}
                  size={120}
                  radius="xl"
                  alt={user.name}
                />
                <div style={{ textAlign: "center" }}>
                  <Text fw={600} size="lg">{user.name}</Text>
                  <Text c="dimmed" size="sm">{user.email}</Text>
                  <Badge color={user.role === "ADMIN" ? "red" : "blue"} mt="xs">
                    {user.role === "ADMIN" ? "Quản trị viên" : "Người dùng"}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  leftSection={<IconUpload size={16} />}
                  onClick={openAvatar}
                  fullWidth
                >
                  Thay đổi ảnh đại diện
                </Button>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8 }}>
            {/* Thông tin chi tiết */}
            <Paper p="xl" shadow="sm" radius="md">
              <Group justify="space-between" mb="lg">
                <Title order={2}>Thông tin cá nhân</Title>
                <Button
                  leftSection={<IconEdit size={16} />}
                  onClick={open}
                >
                  Chỉnh sửa
                </Button>
              </Group>

              <Stack gap="md">
                <Group>
                  <IconUser size={20} style={{ color: "#868e96" }} />
                  <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Họ và tên</Text>
                    <Text fw={500}>{user.name}</Text>
                  </div>
                </Group>

                <Group>
                  <IconMail size={20} style={{ color: "#868e96" }} />
                  <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Email</Text>
                    <Text fw={500}>{user.email}</Text>
                  </div>
                </Group>

                <Group>
                  <IconPhone size={20} style={{ color: "#868e96" }} />
                  <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Số điện thoại</Text>
                    <Text fw={500}>{user.phone || "Chưa cập nhật"}</Text>
                  </div>
                </Group>

                <Group>
                  <IconCalendar size={20} style={{ color: "#868e96" }} />
                  <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Ngày sinh</Text>
                    <Text fw={500}>{user.birthday || "Chưa cập nhật"}</Text>
                  </div>
                </Group>

                <Group>
                  <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Giới tính</Text>
                    <Text fw={500}>{user.gender ? "Nam" : "Nữ"}</Text>
                  </div>
                </Group>
              </Stack>
            </Paper>

            {/* Thống kê */}
            <Paper p="xl" shadow="sm" radius="md" mt="md">
              <Title order={3} mb="lg">Thống kê hoạt động</Title>
              <Grid>
                <Grid.Col span={6}>
                  <Card withBorder radius="md" p="md">
                    <Text ta="center" fw={700} size="xl">{tripCount}</Text>
                    <Text ta="center" c="dimmed" size="sm">Chuyến đi</Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Card withBorder radius="md" p="md">
                    <Text ta="center" fw={700} size="xl">{reviewCount}</Text>
                    <Text ta="center" c="dimmed" size="sm">Đánh giá</Text>
                  </Card>
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Modal chỉnh sửa thông tin */}
        <Modal opened={opened} onClose={close} title="Chỉnh sửa thông tin" size="md">
          <form onSubmit={form.onSubmit(handleUpdateProfile)}>
            <Stack gap="md">
              <TextInput
                label="Họ và tên"
                placeholder="Nhập họ và tên"
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Email"
                placeholder="Nhập email"
                type="email"
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                {...form.getInputProps("phone")}
              />
              <TextInput
                label="Ngày sinh"
                placeholder="Chọn ngày sinh"
                type="date"
                {...form.getInputProps("birthday")}
              />
              <Group justify="flex-end" mt="lg">
                <Button variant="outline" onClick={close}>Hủy</Button>
                <Button type="submit">Lưu thay đổi</Button>
              </Group>
            </Stack>
          </form>
        </Modal>

        {/* Modal upload avatar */}
        <Modal opened={avatarOpened} onClose={closeAvatar} title="Thay đổi ảnh đại diện" size="sm">
          <Stack gap="md">
            <FileInput
              label="Chọn ảnh"
              placeholder="Click để chọn file"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
            <Group justify="flex-end">
              <Button variant="outline" onClick={closeAvatar}>Hủy</Button>
            </Group>
          </Stack>
        </Modal>
      </Container>
    </AuthGuard>
  );
}
