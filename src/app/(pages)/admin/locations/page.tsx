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
  FileInput,
  Image,
} from "@mantine/core";
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconEye,
  IconUpload,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import AdminLayout from "@/app/components/Admin/AdminLayout";
import { Location } from "@/app/types/admin";
import { locationAdminService } from "@/app/services/admin/location.service";
import { showSuccessNotification, showErrorNotification } from "@/app/components/Notification";

export default function LocationsManagement() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [viewingLocation, setViewingLocation] = useState<Location | null>(null);

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
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
    validate: {
      tenViTri: (value) => (value.trim() ? null : "Vui lòng nhập tên vị trí"),
      tinhThanh: (value) => (value.trim() ? null : "Vui lòng nhập tỉnh thành"),
      quocGia: (value) => (value.trim() ? null : "Vui lòng nhập quốc gia"),
      hinhAnh: (value) => (value.trim() ? null : "Vui lòng nhập URL hình ảnh"),
    },
  });

  const editForm = useForm({
    initialValues: {
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
  });

  // Load locations data
  const loadLocations = async () => {
    setLoading(true);
    try {
      const response = await locationAdminService.getPaginated(
        currentPage,
        pageSize,
        searchKeyword
      );
      setLocations(response.data);
      setTotalPages(Math.ceil(response.totalRow / pageSize));
    } catch (error: any) {
      showErrorNotification(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, [currentPage, searchKeyword]);

  // Handle create location
  const handleCreate = async (values: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không có token");

      await locationAdminService.create(values, token);
      showSuccessNotification("Tạo vị trí thành công!");
      createForm.reset();
      closeCreate();
      loadLocations();
    } catch (error: any) {
      showErrorNotification(error.message);
    }
  };

  // Handle edit location
  const handleEdit = async (values: any) => {
    if (!editingLocation) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không có token");

      await locationAdminService.update(editingLocation.id, values, token);
      showSuccessNotification("Cập nhật vị trí thành công!");
      closeEdit();
      loadLocations();
    } catch (error: any) {
      showErrorNotification(error.message);
    }
  };

  // Handle delete location
  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa vị trí này?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không có token");

      await locationAdminService.delete(id, token);
      showSuccessNotification("Xóa vị trí thành công!");
      loadLocations();
    } catch (error: any) {
      showErrorNotification(error.message);
    }
  };

  // Handle upload image
  const handleUploadImage = async (locationId: number, file: File) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không có token");

      const formData = new FormData();
      formData.append("formFile", file);

      await locationAdminService.uploadImage(locationId, formData, token);
      showSuccessNotification("Upload hình ảnh thành công!");
      loadLocations();
    } catch (error: any) {
      showErrorNotification(error.message);
    }
  };

  // Open edit modal with location data
  const openEditModal = (location: Location) => {
    setEditingLocation(location);
    editForm.setValues({
      tenViTri: location.tenViTri,
      tinhThanh: location.tinhThanh,
      quocGia: location.quocGia,
      hinhAnh: location.hinhAnh,
    });
    openEdit();
  };

  // Open view modal
  const openViewModal = (location: Location) => {
    setViewingLocation(location);
    openView();
  };

  const rows = locations.map((location) => (
    <Table.Tr key={location.id}>
      <Table.Td>
        <Group gap="sm">
          <Image
            src={location.hinhAnh}
            alt={location.tenViTri}
            w={60}
            h={45}
            radius="sm"
            fallbackSrc="/placeholder-location.jpg"
          />
          <div>
            <Text fw={500} size="sm">
              {location.tenViTri}
            </Text>
            <Text size="xs" c="dimmed">
              ID: {location.id}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text fw={500}>{location.tinhThanh}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color="blue">
          {location.quocGia}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => openViewModal(location)}
          >
            <IconEye size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="green"
            onClick={() => openEditModal(location)}
          >
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => handleDelete(location.id)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <AdminLayout>
      <Container size="xl">
        <Group justify="space-between" mb="xl">
          <Title order={1}>Quản lý vị trí</Title>
          <Button leftSection={<IconPlus size={16} />} onClick={openCreate}>
            Thêm vị trí
          </Button>
        </Group>

        <Paper shadow="sm" p="md" mb="md">
          <Group>
            <TextInput
              placeholder="Tìm kiếm vị trí..."
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
                <Table.Th>Vị trí</Table.Th>
                <Table.Th>Tỉnh thành</Table.Th>
                <Table.Th>Quốc gia</Table.Th>
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
      <Modal opened={createOpened} onClose={closeCreate} title="Thêm vị trí mới" size="md">
        <form onSubmit={createForm.onSubmit(handleCreate)}>
          <Stack gap="md">
            <TextInput
              label="Tên vị trí"
              placeholder="Nhập tên vị trí"
              {...createForm.getInputProps("tenViTri")}
            />
            <TextInput
              label="Tỉnh thành"
              placeholder="Nhập tỉnh thành"
              {...createForm.getInputProps("tinhThanh")}
            />
            <TextInput
              label="Quốc gia"
              placeholder="Nhập quốc gia"
              {...createForm.getInputProps("quocGia")}
            />
            <TextInput
              label="Hình ảnh URL"
              placeholder="https://example.com/image.jpg"
              {...createForm.getInputProps("hinhAnh")}
            />
            <Group justify="flex-end">
              <Button variant="outline" onClick={closeCreate}>
                Hủy
              </Button>
              <Button type="submit">Tạo mới</Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal opened={editOpened} onClose={closeEdit} title="Chỉnh sửa vị trí" size="md">
        <form onSubmit={editForm.onSubmit(handleEdit)}>
          <Stack gap="md">
            <TextInput
              label="Tên vị trí"
              placeholder="Nhập tên vị trí"
              {...editForm.getInputProps("tenViTri")}
            />
            <TextInput
              label="Tỉnh thành"
              placeholder="Nhập tỉnh thành"
              {...editForm.getInputProps("tinhThanh")}
            />
            <TextInput
              label="Quốc gia"
              placeholder="Nhập quốc gia"
              {...editForm.getInputProps("quocGia")}
            />
            <TextInput
              label="Hình ảnh URL"
              placeholder="https://example.com/image.jpg"
              {...editForm.getInputProps("hinhAnh")}
            />

            {editingLocation && (
              <div>
                <Text size="sm" fw={500} mb="xs">Upload hình ảnh mới</Text>
                <FileInput
                  placeholder="Chọn file hình ảnh"
                  accept="image/*"
                  onChange={(file) => {
                    if (file) {
                      handleUploadImage(editingLocation.id, file);
                    }
                  }}
                  leftSection={<IconUpload size={16} />}
                />
              </div>
            )}

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
      <Modal opened={viewOpened} onClose={closeView} title="Chi tiết vị trí" size="md">
        {viewingLocation && (
          <Stack gap="md">
            <Image
              src={viewingLocation.hinhAnh}
              alt={viewingLocation.tenViTri}
              h={200}
              radius="md"
              fallbackSrc="/placeholder-location.jpg"
            />
            
            <Group justify="space-between">
              <div>
                <Text fw={700} size="lg">{viewingLocation.tenViTri}</Text>
                <Text size="sm" c="dimmed">
                  {viewingLocation.tinhThanh}, {viewingLocation.quocGia}
                </Text>
              </div>
              <Badge size="lg" variant="light" color="blue">
                ID: {viewingLocation.id}
              </Badge>
            </Group>

            <Group grow>
              <Paper p="sm" withBorder>
                <Text size="xs" c="dimmed">TỈNH THÀNH</Text>
                <Text fw={500}>{viewingLocation.tinhThanh}</Text>
              </Paper>
              <Paper p="sm" withBorder>
                <Text size="xs" c="dimmed">QUỐC GIA</Text>
                <Text fw={500}>{viewingLocation.quocGia}</Text>
              </Paper>
            </Group>
          </Stack>
        )}
      </Modal>
    </AdminLayout>
  );
}