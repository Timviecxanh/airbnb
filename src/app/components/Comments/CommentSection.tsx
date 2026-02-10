"use client";

import { useState, useEffect } from "react";
import {
  Stack,
  Title,
  Text,
  Loader,
  Center,
  Group,
  Rating,
  Divider,
  Badge,
} from "@mantine/core";
import { Comment } from "@/app/types/comments";
import { commentService } from "@/app/services/comment.service";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { showErrorNotification } from "@/app/components/Notification";

interface CommentSectionProps {
  maPhong: number;
}

export default function CommentSection({ maPhong }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<number | undefined>();

  const loadComments = async () => {
    try {
      const data = await commentService.getByRoom(maPhong);
      setComments(data || []);
    } catch (error: any) {
      console.error("Error loading comments:", error);
      showErrorNotification("Không thể tải bình luận");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get current user ID
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUserId(user.id);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }

    loadComments();
  }, [maPhong]);

  // Calculate average rating
  const averageRating = comments.length > 0 
    ? comments.reduce((sum, comment) => sum + comment.saoBinhLuan, 0) / comments.length 
    : 0;

  const handleCommentUpdated = () => {
    loadComments();
  };

  if (loading) {
    return (
      <Center py="xl">
        <Loader color="blue" />
      </Center>
    );
  }

  return (
    <Stack gap="lg">
      {/* Header with statistics */}
      <div>
        <Group justify="space-between" align="center" mb="md">
          <Title order={3}>
            Đánh giá & Bình luận
          </Title>
          <Badge size="lg" variant="light" color="blue">
            {comments.length} bình luận
          </Badge>
        </Group>
        
        {comments.length > 0 && (
          <Group gap="md" mb="lg">
            <Group gap="xs">
              <Rating value={averageRating} readOnly size="sm" />
              <Text size="sm" fw={500}>
                {averageRating.toFixed(1)} / 5
              </Text>
            </Group>
            <Text size="sm" c="dimmed">
              Dựa trên {comments.length} đánh giá
            </Text>
          </Group>
        )}
      </div>

      {/* Comment form */}
      <CommentForm 
        maPhong={maPhong} 
        onCommentAdded={handleCommentUpdated}
      />

      <Divider />

      {/* Comments list */}
      {comments.length === 0 ? (
        <Center py="xl">
          <Stack align="center" gap="sm">
            <Text size="lg" fw={500} c="dimmed">
              Chưa có bình luận nào
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              Hãy là người đầu tiên chia sẻ trải nghiệm về phòng này
            </Text>
          </Stack>
        </Center>
      ) : (
        <Stack gap="md">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              onCommentUpdated={handleCommentUpdated}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}