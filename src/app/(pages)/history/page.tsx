"use client";
import { useEffect, useState } from "react";
import { bookingService } from "@/app/services/booking.service";
import {
  Container,
  Title,
  Badge,
  Text,
  Card,
  Group,
  Loader,
  Center,
} from "@mantine/core";
import dayjs from "dayjs";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        try {
          const data = await bookingService.getHistoryByUser(
            user.id,
            user.token,
          );
          setHistory(data);
        } catch (error) {
          console.error("Lỗi lấy lịch sử:", error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <Center h={400}>
        <Loader color="pink" />
      </Center>
    );

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="xl">
        Chuyến đi của bạn
      </Title>

      {history.length === 0 ? (
        <Text c="dimmed">Bạn chưa có chuyến đi nào cả. Hãy khám phá ngay!</Text>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {history.map((item) => (
            <Card key={item.id} withBorder shadow="sm" radius="md" p="md">
              <Group align="flex-start">
                <div style={{ flex: 1 }}>
                  <Group justify="space-between">
                    <Text fw={700} size="lg">
                      Mã đặt phòng: #{item.id}
                    </Text>
                    <Badge color="green" variant="light">
                      Thành công
                    </Badge>
                  </Group>

                  <Group mt="md" gap="xl">
                    <div>
                      <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                        Ngày đến
                      </Text>
                      <Text fw={500}>
                        {dayjs(item.ngayDen).format("DD [thg] MM, YYYY")}
                      </Text>
                    </div>
                    <div>
                      <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                        Ngày đi
                      </Text>
                      <Text fw={500}>
                        {dayjs(item.ngayDi).format("DD [thg] MM, YYYY")}
                      </Text>
                    </div>
                    <div>
                      <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                        Số khách
                      </Text>
                      <Text fw={500}>{item.soLuongKhach} người</Text>
                    </div>
                    <div>
                      <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                        Mã phòng
                      </Text>
                      <Text fw={500}>{item.maPhong}</Text>
                    </div>
                  </Group>
                </div>
              </Group>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
