"use client";
import { useState, useMemo } from "react";
import { DatePicker } from "@mantine/dates";
import {
  Button,
  NumberInput,
  Text,
  Group,
  Divider,
  Stack,
  Card,
} from "@mantine/core";
import dayjs from "dayjs";
import { Room } from "@/app/types/rooms";
import { bookingService } from "@/app/services/booking.service";
export default function BookingCard({ roomDetail }: { roomDetail: Room }) {
  const [range, setRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);
  const [guests, setGuests] = useState<number | string>(1);
  const [loading, setLoading] = useState(false);

  // Tính số đêm dựa trên range đã chọn
  const totalDays = useMemo(() => {
    if (range[0] && range[1])
      return dayjs(range[1]).diff(dayjs(range[0]), "day");
    return 0;
  }, [range]);

  const handleBooking = async () => {
    const userData = localStorage.getItem("user");
    if (!userData) return alert("Vui lòng đăng nhập");

    const user = JSON.parse(userData);

    const payload = {
      // Ép kiểu number để chắc chắn không gửi nhầm chuỗi
      maPhong: Number(roomDetail.id),
      // Format ngày về chuỗi ISO
      ngayDen: dayjs(range[0]).toISOString(),
      ngayDi: dayjs(range[1]).toISOString(),
      soLuongKhach: Number(guests),
      // Lấy đúng ID người dùng (kiểm tra xem user.id hay user.user.id)
      maNguoiDung: Number(user.id),
    };

    try {
      await bookingService.bookRoom(payload, user.token);
      alert("Đặt phòng thành công!");
    } catch (error: any) {
      // Thông báo lỗi chi tiết từ server (ví dụ: "Phòng đã được đặt")
      alert(error.message);
    }
  };

  return (
    <Card
      withBorder
      shadow="md"
      p="xl"
      radius="md"
      style={{ position: "sticky", top: "20px" }}
    >
      <Text size="xl" fw={700}>
        ${roomDetail.giaTien}{" "}
        <Text span size="sm" fw={400} c="dimmed">
          / đêm
        </Text>
      </Text>

      <Stack mt="md">
        <DatePicker
          type="range"
          value={range}
          onChange={setRange}
          minDate={new Date()}
        />

        <NumberInput
          label="Khách"
          description={`Tối đa ${roomDetail.khach} khách`}
          value={guests}
          onChange={setGuests}
          min={1}
          max={roomDetail.khach} // Giới hạn theo dữ liệu server
        />

        {totalDays > 0 && (
          <>
            <Divider my="sm" />
            <Group justify="space-between">
              <Text size="sm">
                ${roomDetail.giaTien} x {totalDays} đêm
              </Text>
              <Text size="sm">${roomDetail.giaTien * totalDays}</Text>
            </Group>
            <Group justify="space-between" mt="sm">
              <Text fw={700}>Tổng tiền</Text>
              <Text fw={700}>${roomDetail.giaTien * totalDays}</Text>
            </Group>
          </>
        )}

        <Button
          fullWidth
          color="pink"
          size="md"
          mt="md"
          loading={loading}
          onClick={handleBooking}
        >
          Đặt phòng
        </Button>
      </Stack>
    </Card>
  );
}
