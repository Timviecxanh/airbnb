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
  Select,
  Badge,
  ActionIcon,
  Pagination,
  Paper,
  Text,
  FileInput,
  Switch,
  Textarea,
  NumberInput,
  Image,
  Card,
} from "@mantine/core";
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconEye,
  IconUpload,
  IconPhoto,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import AdminLayout from "@/app/components/Admin/AdminLayout";
import { RoomAdmin, Location } from "@/app/types/admin";
import { roomAdminService } from "@/app/services/admin/room.service";
import { locationAdminService } from "@/app/services/admin/location.service";
import { showSuccessNotification, showErrorNotification } from "@/app/components/Notification";

export default function RoomsManagement() {
  const [rooms, setRooms] = useState<RoomAdmin[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingRoom, setEditingRoom] = useState<RoomAdmin | null>(null);
  const [viewingRoom, setViewingRoom] = useState<RoomAdmin | null>(null);

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const pageSize = 10;

  // Modals
  const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure();
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure();
  const [viewOpened, { open: openView, close: closeView }] = useDisclosure();

  // Forms
  const createForm = useForm({
    initialValues: {
      tenPhong: "",
      khach: 1,
      phongNgu: 1,
      giuong: 1,
      phongTam: 1,
      moTa: "",
      giaTien: 0,
      mayGiat: false,
      banLa: false,
      tivi: false,
      dieuHoa: false,
      wifi: false,
      bep: false,
      doXe: false,
      hoBoi: false,
      banUi: false,
      maViTri: "",
      hinhAnh: "",
    },
    validate: {
      tenPhong: (value) => (value.trim() ? null : "Vui lòng nhập tên phòng"),
      moTa: (value) => (value.trim() ? null : "Vui lòng nhập mô tả"),
      giaTien: (value) => (value > 0 ? null : "Giá tiền phải lớn hơn 0"),
      maViTri: (value) => (value ? null : "Vui lòng chọn vị trí"),
    },
  });

  const editForm = useForm({
    initialValues: {
      tenPhong: "",
      khach: 1,
      phongNgu: 1,
      giuong: 1,
      phongTam: 1,
      moTa: "",
      giaTien: 0,
      mayGiat: false,
      banLa: false,
      tivi: false,
      dieuHoa: false,
      wifi: false,
      bep: false,
      doXe: false,
      hoBoi: false,
      banUi: false,
      maViTri: "",
      hinhAnh: "",
    },
  });

  // Load data
  const loadRooms = async () => {
    setLoading(true);
    try {
      const response = await roomAdminService.getPaginated(
        currentPage,
        pageSize,
        searchKeyword
      );
      setRooms(response.data);
      setTotalPages(Math.ceil(response.totalRow / pageSize));
    } catch (error: any) {
      showErrorNotification(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadLocations = async () => {
    try {
      const data = await locationAdminService.getAll();
      setLocations(data);
    } catch (error: any) {
      showErrorNotification("Không thể tải danh sách vị trí");
    }
  };

  useEffect(() => {
    loadRooms();
  }, [currentPage, searchKeyword]);

  useEffect(() => {
    loadLocations();
  }, []);

  // Handle create room
  const handleCreate = async (values: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không có token");

      await roomAdminService.create({
        ...values,
        maViTri: parseInt(values.maViTri),
      }, token);
      
      showSuccessNotification("Tạo phòng thành công!");
      createForm.reset();
      closeCreate();
      loadRooms();
    } catch (error: any) {
      showErrorNotification(error.message);
    }
  };

  // Handle edit room
  const handleEdit = async (values: any) => {
    if (!editingRoom) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không có token");

      await roomAdminService.update(editingRoom.id, {
        ...values,
        maViTri: parseInt(values.maViTri),
      }, token);
      
      showSuccessNotification("Cập nhật phòng thành công!");
      closeEdit();
      loadRooms();
    } catch (error: any) {
      showErrorNotification(error.message);
    }
  };

  // Handle delete room
  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa phòng này?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không có token");

      await roomAdminService.delete(id, token);
      showSuccessNotification("Xóa phòng thành công!");
      loadRooms();
    } catch (error: any) {
      showErrorNotification(error.message);
    }
  };

  // Open edit modal with room data
  const openEditModal = (room: RoomAdmin) => {
    setEditingRoom(room);
    editForm.setValues({
      tenPhong: room.tenPhong,
      khach: room.khach,
      phongNgu: room.phongNgu,
      giuong: room.giuong,
      phongTam: room.phongTam,
      moTa: room.moTa,
      giaTien: room.giaTien,
      mayGiat: room.mayGiat,
      banLa: room.banLa,
      tivi: room.tivi,
      dieuHoa: room.dieuHoa,
      wifi: room.wifi,
      bep: room.bep,
      doXe: room.doXe,
      hoBoi: room.hoBoi,
      banUi: room.banUi,
      maViTri: room.maViTri.toString(),
      hinhAnh: room.hinhAnh,
    });
    openEdit();
  };

  // Open view modal
  const openViewModal = (room: RoomAdmin) => {
    setViewingRoom(room);
    openView();
  };

  // Get location name by id
  const getLocationName = (maViTri: number) => {
    const location = locations.find(loc => loc.id === maViTri);
    return location ? `${location.tenViTri}, ${location.tinhThanh}` : `Vị trí ${maViTri}`;
  };

  const rows = rooms.map((room) => (
    <Table.Tr key={room.id}>
      <Table.Td>
        <Group gap="sm">
          <Image
            src={room.hinhAnh}
            alt={room.tenPhong}
            w={60}
            h={45}
            radius="sm"
            fallbackSrc="/placeholder-room.jpg"
          />
          <div>
            <Text fw={500} size="sm">
              {room.tenPhong}
            </Text>
            <Text size="xs" c="dimmed" truncate maw={200}>
              {room.moTa}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>{getLocationName(room.maViTri)}</Table.Td>
      <Table.Td>
        <Text fw={500}>${room.giaTien}</Text>
        <Text size="xs" c="dimmed">/đêm</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={4}>
          <Text size="xs">{room.khach} khách</Text>
          <Text size="xs">•</Text>
          <Text size="xs">{room.phongNgu} phòng ngủ</Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          {room.wifi && <Badge size="xs" color="blue">Wifi</Badge>}
          {room.tivi && <Badge size="xs" color="green">TV</Badge>}
          {room.dieuHoa && <Badge size="xs" color="cyan">AC</Badge>}
        </Group>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => openViewModal(room)}
          >
            <IconEye size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="green"
            onClick={() => openEditModal(room)}
          >
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => handleDelete(room.id)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const locationOptions = locations.map(location => ({
    value: location.id.toString(),
    label: `${location.tenViTri}, ${location.tinhThanh}`,
  }));

  return (
    <AdminLayout>
      <Container size="xl">
        <Group justify="space-between" mb="xl">
          <Title order={1}>Quản lý phòng</Title>
          <Button leftSection={<IconPlus size={16} />} onClick={openCreate}>
            Thêm phòng
          </Button>
        </Group>

        <Paper shadow="sm" p="md" mb="md">
          <Group>
            <TextInput
              placeholder="Tìm kiếm phòng..."
              leftSection={<IconSearch size={16} />}
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
                setCurrentPage(1);
              }}
              style={{ flex: 1 }}
            />
          </Group>
        </Paper>

        <Paper shadow="sm" withBorder>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Phòng</Table.Th>
                <Table.Th>Vị trí</Table.Th>
                <Table.Th>Giá</Table.Th>
                <Table.Th>Chi tiết</Table.Th>
                <Table.Th>Tiện ích</Table.Th>
                <Table.Th>Hành động</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>

          <Group justify="center" p="md">
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={setCurrentPage}
            />
          </Group>
        </Paper>
      </Container>

      {/* Create Modal */}
      <Modal opened={createOpened} onClose={closeCreate} title="Thêm phòng mới" size="lg">
        <form onSubmit={createForm.onSubmit(handleCreate)}>
          <Stack gap="md">
            <Group grow>
              <TextInput
                label="Tên phòng"
                placeholder="Nhập tên phòng"
                {...createForm.getInputProps("tenPhong")}
              />
              <Select
                label="Vị trí"
                placeholder="Chọn vị trí"
                data={locationOptions}
                {...createForm.getInputProps("maViTri")}
                searchable
              />
            </Group>

            <Textarea
              label="Mô tả"
              placeholder="Nhập mô tả phòng"
              minRows={3}
              {...createForm.getInputProps("moTa")}
            />

            <Group grow>
              <NumberInput
                label="Giá tiền"
                placeholder="0"
                min={0}
                {...createForm.getInputProps("giaTien")}
              />
              <NumberInput
                label="Số khách"
                placeholder="1"
                min={1}
                {...createForm.getInputProps("khach")}
              />
            </Group>

            <Group grow>
              <NumberInput
                label="Phòng ngủ"
                placeholder="1"
                min={1}
                {...createForm.getInputProps("phongNgu")}
              />
              <NumberInput
                label="Giường"
                placeholder="1"
                min={1}
                {...createForm.getInputProps("giuong")}
              />
              <NumberInput
                label="Phòng tắm"
                placeholder="1"
                min={1}
                {...createForm.getInputProps("phongTam")}
              />
            </Group>

            <TextInput
              label="Hình ảnh URL"
              placeholder="https://example.com/image.jpg"
              {...createForm.getInputProps("hinhAnh")}
            />

            <Text fw={500}>Tiện ích</Text>
            <Group>
              <Switch label="Máy giặt" {...createForm.getInputProps("mayGiat", { type: "checkbox" })} />
              <Switch label="Bàn là" {...createForm.getInputProps("banLa", { type: "checkbox" })} />
              <Switch label="Tivi" {...createForm.getInputProps("tivi", { type: "checkbox" })} />
              <Switch label="Điều hòa" {...createForm.getInputProps("dieuHoa", { type: "checkbox" })} />
            </Group>
            <Group>
              <Switch label="Wifi" {...createForm.getInputProps("wifi", { type: "checkbox" })} />
              <Switch label="Bếp" {...createForm.getInputProps("bep", { type: "checkbox" })} />
              <Switch label="Chỗ đỗ xe" {...createForm.getInputProps("doXe", { type: "checkbox" })} />
              <Switch label="Hồ bơi" {...createForm.getInputProps("hoBoi", { type: "checkbox" })} />
              <Switch label="Bàn ủi" {...createForm.getInputProps("banUi", { type: "checkbox" })} />
            </Group>

            <Group justify="flex-end">
              <Button variant="outline" onClick={closeCreate}>
                Hủy
              </Button>
              <Button type="submit">Tạo mới</Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* Edit Modal - Similar to Create but with editForm */}
      <Modal opened={editOpened} onClose={closeEdit} title="Chỉnh sửa phòng" size="lg">
        <form onSubmit={editForm.onSubmit(handleEdit)}>
          <Stack gap="md">
            <Group grow>
              <TextInput
                label="Tên phòng"
                placeholder="Nhập tên phòng"
                {...editForm.getInputProps("tenPhong")}
              />
              <Select
                label="Vị trí"
                placeholder="Chọn vị trí"
                data={locationOptions}
                {...editForm.getInputProps("maViTri")}
                searchable
              />
            </Group>

            <Textarea
              label="Mô tả"
              placeholder="Nhập mô tả phòng"
              minRows={3}
              {...editForm.getInputProps("moTa")}
            />

            <Group grow>
              <NumberInput
                label="Giá tiền"
                placeholder="0"
                min={0}
                {...editForm.getInputProps("giaTien")}
              />
              <NumberInput
                label="Số khách"
                placeholder="1"
                min={1}
                {...editForm.getInputProps("khach")}
              />
            </Group>

            <Group grow>
              <NumberInput
                label="Phòng ngủ"
                placeholder="1"
                min={1}
                {...editForm.getInputProps("phongNgu")}
              />
              <NumberInput
                label="Giường"
                placeholder="1"
                min={1}
                {...editForm.getInputProps("giuong")}
              />
              <NumberInput
                label="Phòng tắm"
                placeholder="1"
                min={1}
                {...editForm.getInputProps("phongTam")}
              />
            </Group>

            <TextInput
              label="Hình ảnh URL"
              placeholder="https://example.com/image.jpg"
              {...editForm.getInputProps("hinhAnh")}
            />

            <Text fw={500}>Tiện ích</Text>
            <Group>
              <Switch label="Máy giặt" {...editForm.getInputProps("mayGiat", { type: "checkbox" })} />
              <Switch label="Bàn là" {...editForm.getInputProps("banLa", { type: "checkbox" })} />
              <Switch label="Tivi" {...editForm.getInputProps("tivi", { type: "checkbox" })} />
              <Switch label="Điều hòa" {...editForm.getInputProps("dieuHoa", { type: "checkbox" })} />
            </Group>
            <Group>
              <Switch label="Wifi" {...editForm.getInputProps("wifi", { type: "checkbox" })} />
              <Switch label="Bếp" {...editForm.getInputProps("bep", { type: "checkbox" })} />
              <Switch label="Chỗ đỗ xe" {...editForm.getInputProps("doXe", { type: "checkbox" })} />
              <Switch label="Hồ bơi" {...editForm.getInputProps("hoBoi", { type: "checkbox" })} />
              <Switch label="Bàn ủi" {...editForm.getInputProps("banUi", { type: "checkbox" })} />
            </Group>

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
      <Modal opened={viewOpened} onClose={closeView} title="Chi tiết phòng" size="lg">
        {viewingRoom && (
          <Stack gap="md">
            <Image
              src={viewingRoom.hinhAnh}
              alt={viewingRoom.tenPhong}
              h={200}
              radius="md"
              fallbackSrc="/placeholder-room.jpg"
            />
            
            <Group justify="space-between">
              <div>
                <Text fw={700} size="lg">{viewingRoom.tenPhong}</Text>
                <Text size="sm" c="dimmed">{getLocationName(viewingRoom.maViTri)}</Text>
              </div>
              <Text fw={700} size="xl" c="blue">${viewingRoom.giaTien}/đêm</Text>
            </Group>

            <Text size="sm">{viewingRoom.moTa}</Text>

            <Group grow>
              <Paper p="sm" withBorder>
                <Text size="xs" c="dimmed">KHÁCH</Text>
                <Text fw={500}>{viewingRoom.khach} người</Text>
              </Paper>
              <Paper p="sm" withBorder>
                <Text size="xs" c="dimmed">PHÒNG NGỦ</Text>
                <Text fw={500}>{viewingRoom.phongNgu}</Text>
              </Paper>
              <Paper p="sm" withBorder>
                <Text size="xs" c="dimmed">GIƯỜNG</Text>
                <Text fw={500}>{viewingRoom.giuong}</Text>
              </Paper>
              <Paper p="sm" withBorder>
                <Text size="xs" c="dimmed">PHÒNG TẮM</Text>
                <Text fw={500}>{viewingRoom.phongTam}</Text>
              </Paper>
            </Group>

            <div>
              <Text size="sm" fw={500} mb="xs">Tiện ích</Text>
              <Group gap="xs">
                {viewingRoom.wifi && <Badge color="blue">Wifi</Badge>}
                {viewingRoom.tivi && <Badge color="green">TV</Badge>}
                {viewingRoom.dieuHoa && <Badge color="cyan">Điều hòa</Badge>}
                {viewingRoom.bep && <Badge color="orange">Bếp</Badge>}
                {viewingRoom.mayGiat && <Badge color="purple">Máy giặt</Badge>}
                {viewingRoom.hoBoi && <Badge color="teal">Hồ bơi</Badge>}
                {viewingRoom.doXe && <Badge color="gray">Chỗ đỗ xe</Badge>}
              </Group>
            </div>
          </Stack>
        )}
      </Modal>
    </AdminLayout>
  );
}