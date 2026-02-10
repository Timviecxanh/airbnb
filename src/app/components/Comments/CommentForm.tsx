"use client";

import { useState } from "react";
import {
  Paper,
  Title,
  Button,
  Modal,
  Textarea,
  Stack,
  Group,
  Rating,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { CommentRequest } from "@/app/types/comments";
import { commentService } from "@/app/services/comment.service";
import { showSuccessNotification, showErrorNotification } from "@/app/components/Notification";

interface CommentFormProps {
  maPhong: number;
  onCommentAdded: () => void;
}

export default function CommentForm({ maPhong, onCommentAdded }: CommentFormProps) {
  const [modalOpened, setModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      noiDung: "",
      saoBinhLuan: 0,
    },
    validate: {
      noiDung: (value) => (value.trim() ? null : "Vui lòng nhập nội dung bình luận"),
      saoBinhLuan: (value) => (value > 0 ? null : "Vui lòng chọn số sao đánh giá"),
    },
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      
      if (!token || !userStr) {
        showErrorNotification("Vui lòng đăng nhập để bình luận");
        return;
      }

      const user = JSON.parse(userStr);
      
      const commentData: CommentRequest = {
        maPhong,
        maNguoiBinhLuan: user.id,
        noiDung: values.noiDung,
        saoBinhLuan: values.saoBinhLuan,
      };

      await commentService.create(commentData, token);
      
      showSuccessNotification("Thêm bình luận thành công!");
      form.reset();
      setModalOpened(false);
      onCommentAdded();
    } catch (error: any) {
      showErrorNotification(error.message || "Có lỗi xảy ra khi thêm bình luận");
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showErrorNotification("Vui lòng đăng nhập để bình luận");
      return false;
    }
    return true;
  };

  const openModal = () => {
    if (checkAuth()) {
      setModalOpened(true);
    }
  };

  return (
    <>
      <Paper shadow="sm" p="md" radius="md" withBorder>
        <Group justify="space-between" align="center">
          <div>
            <Title order={4} mb={4}>
              Chia sẻ trải nghiệm của bạn
            </Title>
            <Text size="sm" c="dimmed">
              Đánh giá và bình luận về phòng này
            </Text>
          </div>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={openModal}
            gradient={{ from: "blue", to: "cyan" }}
            variant="gradient"
          >
            Viết bình luận
          </Button>
        </Group>
      </Paper>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Viết bình luận"
        size="md"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <div>
              <Text size="sm" mb={8} fw={500}>
                Đánh giá sao *
              </Text>
              <Rating
                {...form.getInputProps("saoBinhLuan")}
                size="lg"
                count={5}
              />
              {form.errors.saoBinhLuan && (
                <Text size="xs" c="red" mt={4}>
                  {form.errors.saoBinhLuan}
                </Text>
              )}
            </div>

            <Textarea
              label="Nội dung bình luận *"
              placeholder="Chia sẻ trải nghiệm của bạn về phòng này..."
              minRows={4}
              {...form.getInputProps("noiDung")}
            />

            <Group justify="flex-end" mt="md">
              <Button 
                variant="outline" 
                onClick={() => {
                  setModalOpened(false);
                  form.reset();
                }}
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                loading={loading}
                gradient={{ from: "blue", to: "cyan" }}
                variant="gradient"
              >
                Gửi bình luận
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}