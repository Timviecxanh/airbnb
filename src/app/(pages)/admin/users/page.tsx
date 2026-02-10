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
  Avatar,
  Badge,
  ActionIcon,
  Pagination,
  Paper,
  Text,
  FileInput,
  Switch,
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
import { User } from "@/app/types/admin";
import { userAdminService } from "@/app/services/admin/user.service";
import { showSuccessNotification, showErrorNotification } from "@/app/components/Notification";
import dayjs from "dayjs";

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  
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
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "USER",
    },
    validate: {
      name: (value) => (value.trim() ? null : "Vui lòng nhập tên"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email không hợp lệ"),
      password: (value) => (value.length >= 6 ? null : "Mật khẩu ít nhất 6 ký tự"),
      phone: (value) => (/^\d{10}$/.test(value) ? null : "Số điện thoại không hợp lệ"),
      birthday: (value) => (value ? null : "Vui lòng chọn ngày sinh"),
    },
  });

  const editForm = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "USER",
    },
  });

  // Load users data
  const loadUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không có token");

      const response = await userAdminService.getPaginated(
        currentPage,
        pageSize,
        searchKeyword,
        token
      );
      
      setUsers(response.data);
      setTotalPages(Math.ceil(response.totalRow / pageSize));
    } catch (error: any) {
      showErrorNotification(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [currentPage, searchKeyword]);

  // Handle create user
  const handleCreate = async (values: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không có token");

      await userAdminService.create(values, token);
      showSuccessNotification("Tạo người dùng thành công!");
      createForm.reset();
      closeCreate();
      loadUsers();
    } catch (error: any) {
      showErrorNotification(error.message);
    }
  };

  // Handle edit user
  const handleEdit = async (values: any) => {
    if (!editingUser) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không có token");

      await userAdminService.update(editingUser.id, values, token);
      showSuccessNotification("Cập nhật người dùng thành công!");
      closeEdit();
      loadUsers();
    } catch (error: any) {
      showErrorNotification(error.message);
    }
  };

  // Handle delete user
  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa người dùng này?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không có token");

      await userAdminService.delete(id, token);
      showSuccessNotification("Xóa người dùng thành công!");
      loadUsers();
    } catch (error: any) {
      showErrorNotification(error.message);
    }
  };

  // Open edit modal with user data
  const openEditModal = (user: User) => {
    setEditingUser(user);
    editForm.setValues({
      name: user.name,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      gender: user.gender,
      role: user.role,
    });
    openEdit();
  };

  // Open view modal
  const openViewModal = (user: User) => {
    setViewingUser(user);
    openView();
  };

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={36} radius="xl" src={user.avatar} />
          <div>
            <Text fw={500} size="sm">
              {user.name}
            </Text>
            <Text size="xs" c="dimmed">
              {user.email}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>{user.phone}</Table.Td>
      <Table.Td>{dayjs(user.birthday).format("DD/MM/YYYY")}</Table.Td>
      <Table.Td>
        <Badge color={user.gender ? "blue" : "pink"} variant="light">
          {user.gender ? "Nam" : "Nữ"}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={user.role === "ADMIN" ? "red" : "gray"} variant="light">
          {user.role}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => openViewModal(user)}
          >
            <IconEye size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="green"
            onClick={() => openEditModal(user)}
          >
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => handleDelete(user.id)}
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
          <Title order={1}>Quản lý người dùng</Title>
          <Button leftSection={<IconPlus size={16} />} onClick={openCreate}>
            Thêm người dùng
          </Button>
        </Group>

        <Paper shadow="sm" p="md" mb="md">
          <Group>
            <TextInput
              placeholder="Tìm kiếm người dùng..."
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
                <Table.Th>Người dùng</Table.Th>
                <Table.Th>Số điện thoại</Table.Th>
                <Table.Th>Ngày sinh</Table.Th>
                <Table.Th>Giới tính</Table.Th>
                <Table.Th>Vai trò</Table.Th>
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
      <Modal opened={createOpened} onClose={closeCreate} title="Thêm người dùng mới" size="md">
        <form onSubmit={createForm.onSubmit(handleCreate)}>
          <Stack gap="md">
            <TextInput
              label="Tên"
              placeholder="Nhập tên người dùng"
              {...createForm.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Nhập email"
              {...createForm.getInputProps("email")}
            />
            <TextInput
              label="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu"
              {...createForm.getInputProps("password")}
            />
            <TextInput
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              {...createForm.getInputProps("phone")}
            />
            <TextInput
              label="Ngày sinh"
              type="date"
              {...createForm.getInputProps("birthday")}
            />
            <Switch
              label="Giới tính"
              description="Bật: Nam, Tắt: Nữ"
              {...createForm.getInputProps("gender", { type: "checkbox" })}
            />
            <Select
              label="Vai trò"
              data={[
                { value: "USER", label: "Người dùng" },
                { value: "ADMIN", label: "Quản trị viên" },
              ]}
              {...createForm.getInputProps("role")}
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
      <Modal opened={editOpened} onClose={closeEdit} title="Chỉnh sửa người dùng" size="md">
        <form onSubmit={editForm.onSubmit(handleEdit)}>
          <Stack gap="md">
            <TextInput
              label="Tên"
              placeholder="Nhập tên người dùng"
              {...editForm.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Nhập email"
              {...editForm.getInputProps("email")}
            />
            <TextInput
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              {...editForm.getInputProps("phone")}
            />
            <TextInput
              label="Ngày sinh"
              type="date"
              {...editForm.getInputProps("birthday")}
            />
            <Switch
              label="Giới tính"
              description="Bật: Nam, Tắt: Nữ"
              {...editForm.getInputProps("gender", { type: "checkbox" })}
            />
            <Select
              label="Vai trò"
              data={[
                { value: "USER", label: "Người dùng" },
                { value: "ADMIN", label: "Quản trị viên" },
              ]}
              {...editForm.getInputProps("role")}
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
      <Modal opened={viewOpened} onClose={closeView} title="Chi tiết người dùng" size="md">
        {viewingUser && (
          <Stack gap="md">
            <Group>
              <Avatar size={80} radius="xl" src={viewingUser.avatar} />
              <div>
                <Text fw={700} size="lg">{viewingUser.name}</Text>
                <Text size="sm" c="dimmed">{viewingUser.email}</Text>
                <Badge color={viewingUser.role === "ADMIN" ? "red" : "gray"}>
                  {viewingUser.role}
                </Badge>
              </div>
            </Group>
            <Group grow>
              <div>
                <Text size="xs" c="dimmed">SỐ ĐIỆN THOẠI</Text>
                <Text fw={500}>{viewingUser.phone}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">NGÀY SINH</Text>
                <Text fw={500}>{dayjs(viewingUser.birthday).format("DD/MM/YYYY")}</Text>
              </div>
            </Group>
            <div>
              <Text size="xs" c="dimmed">GIỚI TÍNH</Text>
              <Badge color={viewingUser.gender ? "blue" : "pink"}>
                {viewingUser.gender ? "Nam" : "Nữ"}
              </Badge>
            </div>
          </Stack>
        )}
      </Modal>
    </AdminLayout>
  );
}