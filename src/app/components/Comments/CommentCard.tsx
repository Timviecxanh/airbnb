"use client";

import { useState } from "react";
import {
  Paper,
  Text,
  Group,
  Rating,
  Button,
  Modal,
  Textarea,
  Stack,
  Avatar,
  ActionIcon,
  Menu,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDots, IconEdit, IconTrash, IconCalendar } from "@tabler/icons-react";
import { Comment } from "@/app/types/comments";
import { commentService } from "@/app/services/comment.service";
import { showSuccessNotification, showErrorNotification } from "@/app/components/Notification";
import dayjs from "dayjs";

interface CommentCardProps {
  comment: Comment;
  currentUserId?: number;
  onCommentUpdated: () => void;
}

export default function CommentCard({ comment, currentUserId, onCommentUpdated }: CommentCardProps) {
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const editForm = useForm({
    initialValues: {
      noiDung: comment.noiDung,
      saoBinhLuan: comment.saoBinhLuan,
    },
    validate: {
      noiDung: (value) => (value.trim() ? null : "Vui lòng nhập nội dung bình luận"),
      saoBinhLuan: (value) => (value > 0 ? null : "Vui lòng chọn số sao"),
    },
  });

  const handleEdit = async (values: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Vui lòng đăng nhập");

      await commentService.update(
        comment.id,
        {
          id: comment.id,
          maPhong: comment.maPhong,
          maNguoiBinhLuan: comment.maNguoiBinhLuan,
          noiDung: values.noiDung,
          saoBinhLuan: values.saoBinhLuan,
        },
        token
      );

      showSuccessNotification("Cập nhật bình luận thành công!");
      setEditModalOpened(false);
      onCommentUpdated();
    } catch (error: any) {
      showErrorNotification(error.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc muốn xóa bình luận này?")) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Vui lòng đăng nhập");

      await commentService.delete(comment.id, token);
      showSuccessNotification("Xóa bình luận thành công!");
      onCommentUpdated();
    } catch (error: any) {
      showErrorNotification(error.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const isOwner = currentUserId === comment.maNguoiBinhLuan;

  return (
    <>
      <Paper shadow="sm" p="md" radius="md" withBorder>
        <Group justify="space-between" mb="xs">
          <Group>
            <Avatar size={40} radius="xl">
              {comment.maNguoiBinhLuan}
            </Avatar>
            <div>
              <Text size="sm" fw={500}>
                Người dùng #{comment.maNguoiBinhLuan}
              </Text>
              <Group gap="xs">
                <IconCalendar style={{ width: rem(14), height: rem(14) }} />
                <Text size="xs" c="dimmed">
                  {dayjs(comment.ngayBinhLuan).format("DD/MM/YYYY HH:mm")}
                </Text>
              </Group>
            </div>
          </Group>

          {isOwner && (
            <Menu shadow="md" width={120}>
              <Menu.Target>
                <ActionIcon variant="subtle" size="sm">
                  <IconDots style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
                  onClick={() => setEditModalOpened(true)}
                >
                  Chỉnh sửa
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                  onClick={handleDelete}
                >
                  Xóa
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>

        <Rating value={comment.saoBinhLuan} readOnly size="sm" mb="xs" />
        <Text size="sm" mb="md">
          {comment.noiDung}
        </Text>
      </Paper>

      <Modal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        title="Chỉnh sửa bình luận"
        size="md"
      >
        <form onSubmit={editForm.onSubmit(handleEdit)}>
          <Stack gap="md">
            <div>
              <Text size="sm" mb={5}>
                Đánh giá sao
              </Text>
              <Rating {...editForm.getInputProps("saoBinhLuan")} size="lg" />
            </div>

            <Textarea
              label="Nội dung bình luận"
              placeholder="Chia sẻ trải nghiệm của bạn..."
              minRows={3}
              {...editForm.getInputProps("noiDung")}
            />

            <Group justify="flex-end">
              <Button variant="outline" onClick={() => setEditModalOpened(false)}>
                Hủy
              </Button>
              <Button type="submit" loading={loading}>
                Cập nhật
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}