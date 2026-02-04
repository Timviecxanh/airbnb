"use client";

import AdminLayout from "@/app/components/Admin/AdminLayout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Container,
  Title,
  Grid,
  Card,
  Text,
  Group,
  ThemeIcon,
  SimpleGrid,
  Progress,
  RingProgress,
} from "@mantine/core";
import {
  IconUsers,
  IconHome,
  IconMapPin,
  IconCalendarEvent,
  IconTrendingUp,
  IconTrendingDown,
} from "@tabler/icons-react";

export default function AdminDashboard() {
  // Mock data - trong thực tế sẽ lấy từ API
  const stats = [
    {
      title: "Tổng người dùng",
      value: "1,234",
      diff: 12,
      icon: IconUsers,
      color: "blue",
    },
    {
      title: "Tổng phòng",
      value: "856",
      diff: 8,
      icon: IconHome,
      color: "green",
    },
    {
      title: "Vị trí",
      value: "45",
      diff: -2,
      icon: IconMapPin,
      color: "yellow",
    },
    {
      title: "Đặt phòng tháng này",
      value: "324",
      diff: 18,
      icon: IconCalendarEvent,
      color: "red",
    },
  ];

  // Dữ liệu mock cho biểu đồ đặt phòng theo tháng
  const bookingChartData = [
    { month: "1", bookings: 120 },
    { month: "2", bookings: 98 },
    { month: "3", bookings: 150 },
    { month: "4", bookings: 200 },
    { month: "5", bookings: 180 },
    { month: "6", bookings: 250 },
    { month: "7", bookings: 300 },
    { month: "8", bookings: 280 },
    { month: "9", bookings: 320 },
    { month: "10", bookings: 270 },
    { month: "11", bookings: 350 },
    { month: "12", bookings: 400 },
  ];

  return (
    <AdminLayout>
      <Container size="xl">
        <Title order={1} mb="xl">
          Dashboard
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="xl">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const DiffIcon = stat.diff > 0 ? IconTrendingUp : IconTrendingDown;

            return (
              <Card key={stat.title} shadow="sm" p="lg" radius="md" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                      {stat.title}
                    </Text>
                    <Text fw={700} size="xl">
                      {stat.value}
                    </Text>
                    <Group gap="xs" mt={5}>
                      <DiffIcon size={16} color={stat.diff > 0 ? "teal" : "red"} />
                      <Text
                        size="xs"
                        c={stat.diff > 0 ? "teal" : "red"}
                        fw={700}
                      >
                        {Math.abs(stat.diff)}%
                      </Text>
                      <Text size="xs" c="dimmed">
                        so với tháng trước
                      </Text>
                    </Group>
                  </div>
                  <ThemeIcon color={stat.color} variant="light" size="xl" radius="md">
                    <Icon size="1.5rem" />
                  </ThemeIcon>
                </Group>
              </Card>
            );
          })}
        </SimpleGrid>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" p="md" radius="md" withBorder h={400}>
              <Title order={3} mb="md">
                Thống kê đặt phòng
              </Title>
              <Text c="dimmed" mb="md">
                Biểu đồ sẽ được thêm ở đây
              </Text>
              {/* Biểu đồ mock đặt phòng theo tháng */}
              <div style={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookingChartData} margin={{ top: 20, right: 30, left: 30, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" label={{ value: "Tháng", position: "insideBottom", offset: -20 }} />
                    <YAxis label={{ value: "Đặt phòng", angle: -90, position: "insideLeft", offset: 0 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="bookings" stroke="#007bff" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" p="lg" radius="md" withBorder h={400}>
              <Title order={3} mb="md">
                Tình trạng hệ thống
              </Title>

              <Group justify="space-between" mb="xs">
                <Text size="sm">Sử dụng máy chủ</Text>
                <Text size="sm">75%</Text>
              </Group>
              <Progress value={75} mb="md" />

              <Group justify="space-between" mb="xs">
                <Text size="sm">Bộ nhớ</Text>
                <Text size="sm">60%</Text>
              </Group>
              <Progress value={60} color="yellow" mb="md" />

              <Group justify="space-between" mb="xs">
                <Text size="sm">Dung lượng</Text>
                <Text size="sm">45%</Text>
              </Group>
              <Progress value={45} color="green" mb="xl" />

              <div style={{ display: "flex", justifyContent: "center" }}>
                <RingProgress
                  size={120}
                  thickness={12}
                  sections={[
                    { value: 85, color: "blue", tooltip: "Hoạt động tốt" },
                  ]}
                  label={
                    <div style={{ textAlign: "center" }}>
                      <Text size="xs" c="dimmed">
                        Hiệu suất
                      </Text>
                      <Text fw={700} size="lg">
                        85%
                      </Text>
                    </div>
                  }
                />
              </div>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </AdminLayout>
  );
}