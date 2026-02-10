"use client";

import { useState, useEffect } from "react";
import { DetailService } from "@/app/services/detail.service";
import AuthGuard from "@/app/components/Auth/Auth";
import BookingCard from "@/app/components/Booking/BookingCard";
import { CommentSection } from "@/app/components/Comments";
import {
  Container,
  Title,
  Grid,
  Card,
  Image,
  Text,
  Group,
  Badge,
  Divider,
  Stack,
  List,
  ThemeIcon,
  Box,
  Skeleton,
} from "@mantine/core";
import {
  IconWifi,
  IconCar,
  IconPool,
  IconAirConditioning,
  IconDeviceTv,
  IconToolsKitchen2,
  IconBed,
  IconBath,
  IconUsers,
} from "@tabler/icons-react";

interface Props {
  params: { id: string };
}

interface RoomDetail {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: number;
  hinhAnh: string;
}

export default function RoomDetailPage({ params }: Props) {
  const [roomDetail, setRoomDetail] = useState<RoomDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);
        const data = await DetailService.getById(resolvedParams.id);
        setRoomDetail({
          ...data,
          moTa: data.moTa ?? "",
          mayGiat: data.mayGiat ?? false,
          banLa: data.banLa ?? false,
          tivi: data.tivi ?? false,
          dieuHoa: data.dieuHoa ?? false,
          wifi: data.wifi ?? false,
          bep: data.bep ?? false,
          doXe: data.doXe ?? false,
          hoBoi: data.hoBoi ?? false,
          banUi: data.banUi ?? false,
          maViTri: data.maViTri ?? 0,
        });
      } catch (error) {
        console.error("Error fetching room detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const amenities = roomDetail
    ? [
        { icon: IconWifi, name: "Wifi", available: roomDetail.wifi },
        { icon: IconAirConditioning, name: "Điều hòa", available: roomDetail.dieuHoa },
        { icon: IconDeviceTv, name: "TV", available: roomDetail.tivi },
        { icon: IconToolsKitchen2, name: "Bếp", available: roomDetail.bep },
        { icon: IconCar, name: "Đỗ xe", available: roomDetail.doXe },
        { icon: IconPool, name: "Hồ bơi", available: roomDetail.hoBoi },
      ]
    : [];

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Skeleton height={40} mb="lg" />
        <Skeleton height={400} mb="xl" />
        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              <Skeleton height={200} />
              <Skeleton height={150} />
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Skeleton height={300} />
          </Grid.Col>
        </Grid>
      </Container>
    );
  }

  if (!roomDetail) {
    return (
      <Container ta="center" py="xl">
        <Text size="xl" c="dimmed">Không tìm thấy thông tin phòng</Text>
      </Container>
    );
  }

  return (
    <AuthGuard>
      <Container size="xl" py="xl">
        {/* Header */}
        <Title order={1} mb="lg">{roomDetail.tenPhong}</Title>

        {/* Room Image */}
        <Card radius="md" mb="xl">
          <Image
            src={roomDetail.hinhAnh}
            alt={roomDetail.tenPhong}
            height={400}
            fit="cover"
          />
        </Card>

        {/* Main Content Grid */}
        <Grid gutter="xl">
          {/* Left Column: Room Details */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            {/* Room Info */}
            <Card shadow="sm" padding="lg" radius="md" mb="lg">
              <Title order={2} mb="md">Chi tiết căn phòng</Title>
              
              {/* Basic Info */}
              <Group mb="lg">
                <Group gap="xs">
                  <ThemeIcon variant="light" size="sm">
                    <IconUsers size={16} />
                  </ThemeIcon>
                  <Text size="sm">{roomDetail.khach} khách</Text>
                </Group>
                
                <Group gap="xs">
                  <ThemeIcon variant="light" size="sm">
                    <IconBed size={16} />
                  </ThemeIcon>
                  <Text size="sm">{roomDetail.giuong} giường</Text>
                </Group>
                
                <Group gap="xs">
                  <ThemeIcon variant="light" size="sm">
                    <IconBath size={16} />
                  </ThemeIcon>
                  <Text size="sm">{roomDetail.phongTam} phòng tắm</Text>
                </Group>
              </Group>

              <Divider mb="md" />

              {/* Description */}
              {roomDetail.moTa && (
                <>
                  <Title order={3} size="md" mb="sm">Mô tả</Title>
                  <Text mb="lg">{roomDetail.moTa}</Text>
                  <Divider mb="md" />
                </>
              )}

              {/* Amenities */}
              <Title order={3} size="md" mb="sm">Tiện nghi</Title>
              <Grid>
                {amenities.map((amenity, index) => (
                  <Grid.Col span={6} key={index}>
                    <Group gap="xs">
                      <ThemeIcon
                        variant="light"
                        color={amenity.available ? "green" : "gray"}
                        size="sm"
                      >
                        <amenity.icon size={16} />
                      </ThemeIcon>
                      <Text 
                        size="sm" 
                        c={amenity.available ? "dark" : "dimmed"}
                        td={amenity.available ? "none" : "line-through"}
                      >
                        {amenity.name}
                      </Text>
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>
            </Card>
          </Grid.Col>

          {/* Right Column: Booking Card */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Box pos="sticky" style={{ top: 20 }}>
              <BookingCard roomDetail={roomDetail} />
            </Box>
          </Grid.Col>
        </Grid>

        {/* Comments Section */}
        <Box mt="xl">
          <Title order={2} mb="lg">Đánh giá & Nhận xét</Title>
          <CommentSection maPhong={parseInt(id)} />
        </Box>
      </Container>
    </AuthGuard>
  );
}
