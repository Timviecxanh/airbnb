"use client";
import { SimpleGrid, Text, Stack, Anchor } from "@mantine/core";
import classes from "./footer.module.scss";

export function FooterContact() {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3 }} // Chỉnh lại thành 3 cột theo ảnh
      spacing="xl"
      className={classes.contactGrid}
    >
      {/* Cột 1: Hỗ trợ */}
      <Stack gap={8}>
        <Text fw={600} size="sm">
          Hỗ trợ
        </Text>
        <Anchor className={classes.contactLink}>Trung tâm trợ giúp</Anchor>
        <Anchor className={classes.contactLink}>
          Yêu cầu trợ giúp về vấn đề an toàn
        </Anchor>
        <Anchor className={classes.contactLink}>AirCover</Anchor>
        <Anchor className={classes.contactLink}>Chống phân biệt đối xử</Anchor>
        <Anchor className={classes.contactLink}>Hỗ trợ người khuyết tật</Anchor>
        <Anchor className={classes.contactLink}>Các tùy chọn hủy</Anchor>
        <Anchor className={classes.contactLink}>
          Báo cáo lo ngại của khu dân cư
        </Anchor>
      </Stack>

      {/* Cột 2: Đón tiếp khách */}
      <Stack gap={8}>
        <Text fw={600} size="sm">
          Đón tiếp khách
        </Text>
        <Anchor className={classes.contactLink}>
          Cho thuê nhà trên Airbnb
        </Anchor>
        <Anchor className={classes.contactLink}>
          Đưa trải nghiệm của bạn lên Airbnb
        </Anchor>
        <Anchor className={classes.contactLink}>
          Đưa dịch vụ của bạn lên Airbnb
        </Anchor>
        <Anchor className={classes.contactLink}>AirCover cho host</Anchor>
        <Anchor className={classes.contactLink}>
          Tài nguyên về đón tiếp khách
        </Anchor>
        <Anchor className={classes.contactLink}>Diễn đàn cộng đồng</Anchor>
        <Anchor className={classes.contactLink}>
          Đón tiếp khách có trách nhiệm
        </Anchor>
        <Anchor className={classes.contactLink}>
          Tham gia khóa học miễn phí về công việc của host
        </Anchor>
        <Anchor className={classes.contactLink}>Tìm host hỗ trợ</Anchor>
        <Anchor className={classes.contactLink}>Giới thiệu chủ nhà</Anchor>
      </Stack>

      {/* Cột 3: Airbnb */}
      <Stack gap={8}>
        <Text fw={600} size="sm">
          Airbnb
        </Text>
        <Anchor className={classes.contactLink}>
          Bản phát hành Mùa hè 2025
        </Anchor>
        <Anchor className={classes.contactLink}>Trang tin tức</Anchor>
        <Anchor className={classes.contactLink}>Cơ hội nghề nghiệp</Anchor>
        <Anchor className={classes.contactLink}>Nhà đầu tư</Anchor>
        <Anchor className={classes.contactLink}>
          Chỗ ở khẩn cấp Airbnb.org
        </Anchor>
      </Stack>
    </SimpleGrid>
  );
}
