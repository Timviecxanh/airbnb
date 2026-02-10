import { Container, Box, Title, Text, Group, Button, Stack, BackgroundImage, Overlay, Center, Grid, GridCol, Paper, ThemeIcon, Badge } from "@mantine/core";
import { IconMapPin, IconCalendar, IconUsers, IconStar, IconWifi, IconPool, IconCar, IconHome, IconSearch, IconSparkles } from "@tabler/icons-react";
import Header from "./components/Header/header";
import Footer from "./components/Footer";
import Search from "@/app/components/Search/Search";
import Roomlist from "@/app/(pages)/rooms/components/RoomList";
import BackToTopIcon from "@/app/components/BackToTopIcon";

export default function HomePage() {
  return (
    <>
      {/* Header */}
      <header>
        <Header />
      </header>

      {/* Hero Section */}
      <Box pos="relative" h={{ base: 600, md: 700 }}>
        <BackgroundImage
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80"
          h="100%"
        >
          <Overlay color="#000" opacity={0.6} zIndex={1} />
          <Center h="100%" style={{ position: 'relative', zIndex: 2 }}>
            <Container size="xl">
              <Stack align="center" gap="xl" ta="center" c="white">
                <Badge 
                  size="lg" 
                  variant="light" 
                  color="cyan" 
                  mb="md" 
                  style={{ marginTop: 48, backgroundColor: 'rgba(255, 255, 255, 0.95)', color: '#0ea5e9' }}
                >
                  Tìm ngôi nhà hoàn hảo cho bạn
                </Badge>
                
                <Title 
                  order={1} 
                  size="3.5rem"
                  fw={700} 
                  ta="center"
                  lh={1.1}
                  maw={900}
                  style={{ textShadow: '0 2px 16px rgba(0,0,0,0.45), 0 1px 1px rgba(0,0,0,0.25)' }}
                >
                  Khám phá những điểm đến
                  <Text span style={{ color: '#00d4ff', fontSize: 'inherit', fontWeight: 700, textShadow: '0 2px 16px rgba(0,0,0,0.45), 0 1px 1px rgba(0,0,0,0.25)' }}> tuyệt vời </Text>
                  trên khắp đất nước
                </Title>
                
                <Text 
                  size="xl" 
                  maw={600} 
                  ta="center"
                  opacity={0.9}
                  lh={1.6}
                  style={{ textShadow: '0 2px 16px rgba(0,0,0,0.45), 0 1px 1px rgba(0,0,0,0.25)' }}
                >
                  Từ những ngôi nhà ấm cúng đến những villa sang trọng, 
                  chúng tôi có tất cả những gì bạn cần cho kỳ nghỉ hoàn hảo
                </Text>

                <Group gap="lg" mt="xl">
                  <Button 
                    size="xl" 
                    radius="xl" 
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                    leftSection={<IconSearch size={20} />}
                  >
                    Khám phá ngay
                  </Button>
                  <Button 
                    size="xl" 
                    radius="xl" 
                    variant="white" 
                    color="dark"
                    leftSection={<IconCalendar size={20} />}
                  >
                    Đặt phòng
                  </Button>
                </Group>
              </Stack>
            </Container>
          </Center>
        </BackgroundImage>
      </Box>

      {/* Features Section */}
      <Container size="xl" py={80}>
        <Stack gap={50}>
          <Stack align="center" gap="md">
            <Badge size="lg" variant="light" color="pink">
              Tại sao chọn chúng tôi
            </Badge>
            <Title order={2} ta="center" size="2.5rem" fw={600}>
              Trải nghiệm đẳng cấp cao
            </Title>
            <Text size="lg" ta="center" maw={700} c="dimmed">
              Chúng tôi mang đến những dịch vụ tốt nhất với tiêu chuẩn cao nhất
            </Text>
          </Stack>

          <Grid>
            <GridCol span={{ base: 12, md: 4 }}>
              <Paper p="xl" radius="lg" shadow="sm" h="100%" withBorder>
                <ThemeIcon size={60} radius="xl" gradient={{ from: 'blue', to: 'cyan' }} mb="lg">
                  <IconStar size={30} />
                </ThemeIcon>
                <Title order={3} mb="md">Chất lượng 5 sao</Title>
                <Text c="dimmed" lh={1.6}>
                  Tất cả các chỗ ở đều được kiểm duyệt kỹ lưỡng để đảm bảo 
                  chất lượng và sự hài lòng của khách hàng.
                </Text>
              </Paper>
            </GridCol>
            
            <GridCol span={{ base: 12, md: 4 }}>
              <Paper p="xl" radius="lg" shadow="sm" h="100%" withBorder>
                <ThemeIcon size={60} radius="xl" gradient={{ from: 'green', to: 'teal' }} mb="lg">
                  <IconWifi size={30} />
                </ThemeIcon>
                <Title order={3} mb="md">Tiện nghi đầy đủ</Title>
                <Text c="dimmed" lh={1.6}>
                  WiFi miễn phí, bể bơi, bãi đậu xe và nhiều tiện ích khác 
                  để làm cho kỳ nghỉ của bạn trở nên hoàn hảo.
                </Text>
              </Paper>
            </GridCol>
            
            <GridCol span={{ base: 12, md: 4 }}>
              <Paper p="xl" radius="lg" shadow="sm" h="100%" withBorder>
                <ThemeIcon size={60} radius="xl" gradient={{ from: 'pink', to: 'red' }} mb="lg">
                  <IconUsers size={30} />
                </ThemeIcon>
                <Title order={3} mb="md">Hỗ trợ 24/7</Title>
                <Text c="dimmed" lh={1.6}>
                  Đội ngũ hỗ trợ khách hàng luôn sẵn sàng giúp đỡ bạn 
                  mọi lúc, mọi nơi với sự nhiệt tình và chuyên nghiệp.
                </Text>
              </Paper>
            </GridCol>
          </Grid>
        </Stack>
      </Container>

      {/* Room List Section with Integrated Search */}
      <Box py={40}>
        <Container size="xl">
          <Stack gap={30}>
            <Search />
            <Roomlist />
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
      <BackToTopIcon />
    </>
  );
}
