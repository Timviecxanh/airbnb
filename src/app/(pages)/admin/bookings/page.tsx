"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Button,
  Table,
  Group,
  TextInput,
  Modal,
  Stack,
  Badge,
  ActionIcon,
  Pagination,
  Paper,
  Text,
  NumberInput,
} from "@mantine/core";
import {
  IconSearch,
  IconEdit,
  IconTrash,
  IconEye,
  IconCalendar,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import AdminLayout from "@/app/components/Admin/AdminLayout";
import { BookingAdmin, RoomAdmin, User } from "@/app/types/admin";
import { bookingAdminService } from "@/app/services/admin/booking.service";
import { roomAdminService } from "@/app/services/admin/room.service";
import { userAdminService } from "@/app/services/admin/user.service";
import { showSuccessNotification, showErrorNotification } from "@/app/components/Notification";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

// Enable isBetween plugin
dayjs.extend(isBetween);

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<BookingAdmin[]>([]);
  const [rooms, setRooms] = useState<RoomAdmin[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingBooking, setEditingBooking] = useState<BookingAdmin | null>(null);
  const [viewingBooking, setViewingBooking] = useState<BookingAdmin | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Search
  const [searchKeyword, setSearchKeyword] = useState("");

  // Modals
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure();
  const [viewOpened, { open: openView, close: closeView }] = useDisclosure();

  // Edit Form
  const editForm = useForm({
    initialValues: {
      maPhong: 0,
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: 1,
      maNguoiDung: 0,
    },
    validate: {
      ngayDen: (value) => (value ? null : "Vui lòng chọn ngày đến"),
      ngayDi: (value) => (value ? null : "Vui lòng chọn ngày đi"),
      soLuongKhach: (value) => (value > 0 ? null : "Số lượng khách phải lớn hơn 0"),
    },
  });

  // Load data
  const loadBookings = async () => {
    setLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      if (!token) throw new Error("Không có token");

      const data = await bookingAdminService.getAll(token);
      setBookings(data);
    } catch (error: any) {
      showErrorNotification(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadRooms = async () => {
    try {
      const data = await roomAdminService.getAll();
      setRooms(data);
    } catch (error: any) {
      console.error("Error loading rooms:", error);
    }
  };

  const loadUsers = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      if (!token) throw new Error("Không có token");

      const data = await userAdminService.getAll(token);
      setUsers(data);
    } catch (error: any) {
      console.error("Error loading users:", error);
    }
  };

  useEffect(() => {
    setIsClient(true);
    loadBookings();
    loadRooms();
    loadUsers();
  }, []);

  // Handle edit booking
  const handleEdit = async (values: any) => {
    if (!editingBooking) return;

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      if (!token) throw new Error("Không có token");

      await bookingAdminService.update(editingBooking.id, {
        maPhong: values.maPhong,
        ngayDen: values.ngayDen,
        ngayDi: values.ngayDi,
        soLuongKhach: values.soLuongKhach,
        maNguoiDung: values.maNguoiDung,
      }, token);
      
      showSuccessNotification("Cập nhật đặt phòng thành công!");
      closeEdit();
      loadBookings();
    } catch (error: any) {
      showErrorNotification(error.message);
    }
  };

  // Handle delete booking
  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa đặt phòng này?")) return;

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      if (!token) throw new Error("Không có token");

      await bookingAdminService.delete(id, token);
      showSuccessNotification("Xóa đặt phòng thành công!");
      loadBookings();
    } catch (error: any) {
      showErrorNotification(error.message);
    }
  };

  // Open edit modal with booking data
  const openEditModal = (booking: BookingAdmin) => {
    setEditingBooking(booking);
    editForm.setValues({
      maPhong: booking.maPhong,
      ngayDen: dayjs(booking.ngayDen).format("YYYY-MM-DD"),
      ngayDi: dayjs(booking.ngayDi).format("YYYY-MM-DD"),
      soLuongKhach: booking.soLuongKhach,
      maNguoiDung: booking.maNguoiDung,
    });
    openEdit();
  };

  // Open view modal
  const openViewModal = (booking: BookingAdmin) => {
    setViewingBooking(booking);
    openView();
  };

  // Get room name by id
  const getRoomName = (maPhong: number) => {
    const room = rooms.find(room => room.id === maPhong);
    return room ? room.tenPhong : `Phòng ${maPhong}`;
  };

  // Get user name by id
  const getUserName = (maNguoiDung: number) => {
    const user = users.find(user => user.id === maNguoiDung);
    return user ? user.name : `User ${maNguoiDung}`;
  };

  // Filter bookings based on search
  const filteredBookings = bookings.filter(booking => {
    const roomName = getRoomName(booking.maPhong).toLowerCase();
    const userName = getUserName(booking.maNguoiDung).toLowerCase();
    const keyword = searchKeyword.toLowerCase();
    
    return roomName.includes(keyword) || 
           userName.includes(keyword) ||
           booking.id.toString().includes(keyword);
  });

  // Calculate total days and status
  const getBookingDetails = (booking: BookingAdmin) => {
    const ngayDen = dayjs(booking.ngayDen);
    const ngayDi = dayjs(booking.ngayDi);
    const totalDays = ngayDi.diff(ngayDen, 'day');
    
    const now = dayjs();
    let status = "upcoming";
    let statusText = "Sắp tới";
    let statusColor = "blue";
    
    if (now.isAfter(ngayDi)) {
      status = "completed";
      statusText = "Hoàn thành";
      statusColor = "green";
    } else if (now.isBetween(ngayDen, ngayDi)) {
      status = "ongoing";
      statusText = "Đang diễn ra";
      statusColor = "orange";
    }
    
    return { totalDays, statusText, statusColor };
  };

  const rows = filteredBookings.map((booking) => {
    const { totalDays, statusText, statusColor } = getBookingDetails(booking);
    
    return (
      <Table.Tr key={booking.id}>
        <Table.Td>
          <Text fw={500}>#{booking.id}</Text>
        </Table.Td>
        <Table.Td>
          <Text fw={500}>{getRoomName(booking.maPhong)}</Text>
          <Text size="xs" c="dimmed">ID: {booking.maPhong}</Text>
        </Table.Td>
        <Table.Td>
          <Text fw={500}>{getUserName(booking.maNguoiDung)}</Text>
          <Text size="xs" c="dimmed">ID: {booking.maNguoiDung}</Text>
        </Table.Td>
        <Table.Td suppressHydrationWarning>
          <Text size="sm">{isClient ? dayjs(booking.ngayDen).format("DD/MM/YYYY") : 'Loading...'}</Text>
          <Text size="xs" c="dimmed">đến</Text>
          <Text size="sm">{isClient ? dayjs(booking.ngayDi).format("DD/MM/YYYY") : 'Loading...'}</Text>
        </Table.Td>
        <Table.Td>
          <Group gap="xs">
            <Text size="sm">{booking.soLuongKhach} khách</Text>
            <Text size="xs">•</Text>
            <Text size="sm">{totalDays} đêm</Text>
          </Group>
        </Table.Td>
        <Table.Td>
          <Badge color={statusColor} variant="light">
            {statusText}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Group gap="xs">
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => openViewModal(booking)}
            >
              <IconEye size={16} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="green"
              onClick={() => openEditModal(booking)}
            >
              <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => handleDelete(booking.id)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <AdminLayout>
      <Container size="xl">
        <Group justify="space-between" mb="xl">
          <Title order={1}>Quản lý đặt phòng</Title>
        </Group>

        <Paper shadow="sm" p="md" mb="md">
          <Group>
            <TextInput
              placeholder="Tìm kiếm đặt phòng..."
              leftSection={<IconSearch size={16} />}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={{ flex: 1 }}
            />
          </Group>
        </Paper>

        <Paper shadow="sm" withBorder>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Phòng</Table.Th>
                <Table.Th style={{ width: 120 }}>Khách hàng</Table.Th>
                <Table.Th>Thời gian</Table.Th>
                <Table.Th>Chi tiết</Table.Th>
                <Table.Th>Trạng thái</Table.Th>
                <Table.Th>Hành động</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Paper>
      </Container>

      {/* Edit Modal */}
      <Modal opened={editOpened} onClose={closeEdit} title="Chỉnh sửa đặt phòng" size="md">
        <form onSubmit={editForm.onSubmit(handleEdit)}>
          <Stack gap="md">
            <NumberInput
              label="ID Phòng"
              placeholder="Nhập ID phòng"
              {...editForm.getInputProps("maPhong")}
            />
            <NumberInput
              label="ID Người dùng"
              placeholder="Nhập ID người dùng"
              {...editForm.getInputProps("maNguoiDung")}
            />
            <TextInput
              label="Ngày đến"
              type="date"
              {...editForm.getInputProps("ngayDen")}
            />
            <TextInput
              label="Ngày đi"
              type="date"
              {...editForm.getInputProps("ngayDi")}
            />
            <NumberInput
              label="Số lượng khách"
              placeholder="Nhập số lượng khách"
              min={1}
              {...editForm.getInputProps("soLuongKhach")}
            />
            <Group justify="flex-end">
              <Button variant="outline" onClick={closeEdit}>
                Hủy
              </Button>
              <Button type="submit">Cập nhật</Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal opened={viewOpened} onClose={closeView} title="Chi tiết đặt phòng" size="md">
        {viewingBooking && (
          <Stack gap="md">
            <Group justify="space-between">
              <div>
                <Text fw={700} size="lg">Đặt phòng #{viewingBooking.id}</Text>
                <Badge color={getBookingDetails(viewingBooking).statusColor}>
                  {getBookingDetails(viewingBooking).statusText}
                </Badge>
              </div>
            </Group>

            <Group grow>
              <Paper p="sm" withBorder>
                <Text size="xs" c="dimmed">PHÒNG</Text>
                <Text fw={500}>{getRoomName(viewingBooking.maPhong)}</Text>
                <Text size="xs" c="dimmed">ID: {viewingBooking.maPhong}</Text>
              </Paper>
              <Paper p="sm" withBorder>
                <Text size="xs" c="dimmed">KHÁCH HÀNG</Text>
                <Text fw={500}>{getUserName(viewingBooking.maNguoiDung)}</Text>
                <Text size="xs" c="dimmed">ID: {viewingBooking.maNguoiDung}</Text>
              </Paper>
            </Group>

            <Group grow>
              <Paper p="sm" withBorder>
                <Text size="xs" c="dimmed">NGÀY ĐẾN</Text>
                <Text fw={500} suppressHydrationWarning>
                  {isClient ? dayjs(viewingBooking.ngayDen).format("DD/MM/YYYY") : 'Loading...'}
                </Text>
              </Paper>
              <Paper p="sm" withBorder>
                <Text size="xs" c="dimmed">NGÀY ĐI</Text>
                <Text fw={500} suppressHydrationWarning>
                  {isClient ? dayjs(viewingBooking.ngayDi).format("DD/MM/YYYY") : 'Loading...'}
                </Text>
              </Paper>
            </Group>

            <Group grow>
              <Paper p="sm" withBorder>
                <Text size="xs" c="dimmed">SỐ KHÁCH</Text>
                <Text fw={500}>{viewingBooking.soLuongKhach} người</Text>
              </Paper>
              <Paper p="sm" withBorder>
                <Text size="xs" c="dimmed">SỐ ĐÊM</Text>
                <Text fw={500}>{getBookingDetails(viewingBooking).totalDays} đêm</Text>
              </Paper>
            </Group>
          </Stack>
        )}
      </Modal>
    </AdminLayout>
  );
}