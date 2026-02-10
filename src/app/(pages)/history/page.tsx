"use client";
import { useEffect, useState } from "react";
import { bookingService } from "@/app/services/booking.service";
import { DetailService } from "@/app/services/detail.service";
import {
  Container,
  Title,
  Badge,
  Text,
  Card,
  Group,
  Loader,
  Center,
  Image,
  Stack,
  Button,
  Grid,
  Divider,
  ActionIcon,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconCalendar, IconUsers, IconMapPin } from "@tabler/icons-react";
import { showSuccessNotification } from "@/app/components/Notification";
import AuthGuard from "@/app/components/Auth/Auth";
import Link from "next/link";
import dayjs from "dayjs";

interface BookingHistory {
  id: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
}

interface RoomDetail {
  id: number;
  tenPhong: string;
  hinhAnh: string;
  giaTien: number;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  maViTri: number;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<BookingHistory[]>([]);
  const [roomDetails, setRoomDetails] = useState<{ [key: number]: RoomDetail }>({});
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<BookingHistory | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          try {
            const data = await bookingService.getHistoryByUser(user.id, user.token);
            setHistory(data);
            
            // Fetch room details for each booking
            const roomDetailsMap: { [key: number]: RoomDetail } = {};
            for (const booking of data) {
              try {
                const roomDetail = await DetailService.getById(booking.maPhong.toString());
                // Đảm bảo có đủ các trường theo RoomDetail, tránh ghi đè thuộc tính
                roomDetailsMap[booking.maPhong] = {
                  ...roomDetail,
                  moTa: roomDetail.moTa ?? "",
                  maViTri: roomDetail.maViTri ?? 0,
                };
              } catch (error) {
                console.error(`Error fetching room ${booking.maPhong}:`, error);
              }
            }
            setRoomDetails(roomDetailsMap);
          } catch (error) {
            console.error("Lỗi lấy lịch sử:", error);
          }
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const calculateTotalPrice = (booking: BookingHistory): number => {
    const room = roomDetails[booking.maPhong];
    if (!room) return 0;
    
    const checkIn = dayjs(booking.ngayDen);
    const checkOut = dayjs(booking.ngayDi);
    const nights = checkOut.diff(checkIn, 'day');
    
    return room.giaTien * nights;
  };

  const openDetailModal = (booking: BookingHistory) => {
    setSelectedBooking(booking);
    open();
  };

  if (loading) {
    return (
      <Center h={400}>
        <Loader color="pink" />
      </Center>
    );
  }

  return (
    <AuthGuard>
      <Container size="lg" py="xl">
        <Title order={1} mb="xl">Lịch sử đặt phòng</Title>

        {history.length === 0 ? (
          <Center py="xl">
            <Stack align="center" gap="md">
              <Text size="lg" c="dimmed">Bạn chưa có chuyến đi nào</Text>
              <Text size="sm" c="dimmed">Hãy khám phá và đặt phòng ngay!</Text>
              <Button component={Link} href="/rooms" size="md">
                Tìm phòng ngay
              </Button>
            </Stack>
          </Center>
        ) : (
          <Stack gap="lg">
            {history.map((booking) => {
              const room = roomDetails[booking.maPhong];
              const totalPrice = calculateTotalPrice(booking);
              const nights = dayjs(booking.ngayDi).diff(dayjs(booking.ngayDen), 'day');

              return (
                <Card key={booking.id} shadow="sm" padding="lg" radius="md" withBorder>
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      {room && (
                        <Image
                          src={room.hinhAnh}
                          alt={room.tenPhong}
                          height={200}
                          radius="md"
                          fit="cover"
                        />
                      )}
                    </Grid.Col>
                    
                    <Grid.Col span={{ base: 12, md: 8 }}>
                      <Stack gap="sm">
                        <Group justify="space-between" align="flex-start">
                          <div>
                            <Title order={3} size="lg">
                              {room?.tenPhong || `Phòng #${booking.maPhong}`}
                            </Title>
                            <Text size="sm" c="dimmed">
                              Mã đặt phòng: #{booking.id}
                            </Text>
                          </div>
                          <Badge color="green" size="lg">
                            Đã hoàn thành
                          </Badge>
                        </Group>

                        <Divider my="xs" />

                        <Grid gutter="md">
                          <Grid.Col span={6}>
                            <Group gap="xs">
                              <IconCalendar size={16} color="#868e96" />
                              <div>
                                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                  Ngày đến
                                </Text>
                                <Text size="sm" fw={500}>
                                  {dayjs(booking.ngayDen).format("DD/MM/YYYY")}
                                </Text>
                              </div>
                            </Group>
                          </Grid.Col>
                          
                          <Grid.Col span={6}>
                            <Group gap="xs">
                              <IconCalendar size={16} color="#868e96" />
                              <div>
                                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                  Ngày đi
                                </Text>
                                <Text size="sm" fw={500}>
                                  {dayjs(booking.ngayDi).format("DD/MM/YYYY")}
                                </Text>
                              </div>
                            </Group>
                          </Grid.Col>
                          
                          <Grid.Col span={6}>
                            <Group gap="xs">
                              <IconUsers size={16} color="#868e96" />
                              <div>
                                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                  Số khách
                                </Text>
                                <Text size="sm" fw={500}>
                                  {booking.soLuongKhach} người
                                </Text>
                              </div>
                            </Group>
                          </Grid.Col>
                          
                          <Grid.Col span={6}>
                            <div>
                              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                Tổng tiền
                              </Text>
                              <Text size="lg" fw={700} c="blue">
                                ${totalPrice.toLocaleString()}
                              </Text>
                              <Text size="xs" c="dimmed">
                                ({nights} đêm)
                              </Text>
                            </div>
                          </Grid.Col>
                        </Grid>

                        <Group justify="space-between" mt="md">
                          <Group gap="xs">
                            <Button
                              variant="outline"
                              size="sm"
                              leftSection={<IconEye size={16} />}
                              onClick={() => openDetailModal(booking)}
                            >
                              Xem chi tiết
                            </Button>
                            {room && (
                              <Button
                                component={Link}
                                href={`/rooms/${room.id}`}
                                variant="light"
                                size="sm"
                              >
                                Xem phòng
                              </Button>
                            )}
                          </Group>
                          
                          <Text size="xs" c="dimmed">
                            Đặt ngày {dayjs(booking.ngayDen).subtract(7, 'day').format("DD/MM/YYYY")}
                          </Text>
                        </Group>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </Card>
              );
            })}
          </Stack>
        )}

        {/* Detail Modal */}
        <Modal
          opened={opened}
          onClose={close}
          title="Chi tiết đặt phòng"
          size="md"
          centered
        >
          {selectedBooking && (
            <Stack gap="md">
              <Group justify="space-between">
                <Text fw={700}>Mã đặt phòng</Text>
                <Text>#{selectedBooking.id}</Text>
              </Group>
              
              <Group justify="space-between">
                <Text fw={700}>Mã phòng</Text>
                <Text>#{selectedBooking.maPhong}</Text>
              </Group>
              
              <Group justify="space-between">
                <Text fw={700}>Ngày đến</Text>
                <Text>{dayjs(selectedBooking.ngayDen).format("DD/MM/YYYY")}</Text>
              </Group>
              
              <Group justify="space-between">
                <Text fw={700}>Ngày đi</Text>
                <Text>{dayjs(selectedBooking.ngayDi).format("DD/MM/YYYY")}</Text>
              </Group>
              
              <Group justify="space-between">
                <Text fw={700}>Số khách</Text>
                <Text>{selectedBooking.soLuongKhach} người</Text>
              </Group>
              
              <Group justify="space-between">
                <Text fw={700}>Tổng tiền</Text>
                <Text size="lg" fw={700} c="blue">
                  ${calculateTotalPrice(selectedBooking).toLocaleString()}
                </Text>
              </Group>
              
              <Button 
                fullWidth 
                onClick={() => {
                  showSuccessNotification("Thông tin đã được sao chép!");
                  close();
                }}
              >
                Đóng
              </Button>
            </Stack>
          )}
        </Modal>
      </Container>
    </AuthGuard>
  );
}
