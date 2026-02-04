"use client";

import {
  AppShell,
  Text,
  Group,
  NavLink,
  Avatar,
  Menu,
  ActionIcon,
  rem,
  Burger,
} from "@mantine/core";
import {
  IconUsers,
  IconHome,
  IconMapPin,
  IconCalendarEvent,
  IconLogout,
  IconSettings,
  IconDashboard,
  IconChevronRight,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        // Kiểm tra quyền admin
        if (parsedUser.role !== "ADMIN") {
          setError("Bạn không có quyền truy cập trang này. Chỉ ADMIN mới được phép.");
          setLoading(false);
          return;
        }
        setLoading(false);
      } catch (e) {
        setError("Dữ liệu người dùng không hợp lệ.");
        setLoading(false);
      }
    } else {
      setError("Vui lòng đăng nhập để tiếp tục.");
      setLoading(false);
    }
  }, []);

  // Loading state
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Đang tải...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px' }}>
        <h2>Truy cập bị từ chối</h2>
        <p>{error}</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => router.push("/login")} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Đăng nhập
          </button>
          <button onClick={() => router.push("/")} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Về trang chủ
          </button>
          <button onClick={() => router.push("/admin-test")} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Tạo Admin Test
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const navItems = [
    {
      icon: IconDashboard,
      label: "Dashboard",
      href: "/admin",
    },
    {
      icon: IconUsers,
      label: "Quản lý người dùng",
      href: "/admin/users",
    },
    {
      icon: IconHome,
      label: "Quản lý phòng",
      href: "/admin/rooms",
    },
    {
      icon: IconMapPin,
      label: "Quản lý vị trí",
      href: "/admin/locations",
    },
    {
      icon: IconCalendarEvent,
      label: "Quản lý đặt phòng",
      href: "/admin/bookings",
    },
  ];

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text size="xl" fw={700} c="blue">
              AirBnB Admin
            </Text>
          </Group>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Group style={{ cursor: "pointer" }}>
                <Avatar size={36} radius="xl" />
                <Text size="sm" fw={500}>
                  {user?.name || "Admin"}
                </Text>
              </Group>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
              >
                Cài đặt
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                onClick={handleLogout}
              >
                Đăng xuất
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text size="xs" tt="uppercase" fw={700} c="dimmed" mb="md">
          Quản trị hệ thống
        </Text>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              leftSection={<Icon size="1rem" />}
              rightSection={<IconChevronRight size="0.8rem" />}
              active={isActive}
              onClick={() => router.push(item.href)}
              style={{
                borderRadius: "8px",
                marginBottom: "4px",
              }}
            />
          );
        })}
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}