'use client';
import Link from 'next/link';
import { useAuth } from "@/app/hooks/useAuth";
import { Tabs,  Avatar,  Menu, Image } from "@mantine/core";
import {
  IconHome,
  IconBalloon,
  IconArmchair,
  IconMenu2,
  IconWorld,
  IconUserCircle
} from "@tabler/icons-react";
import nav from "./header.module.scss";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className={nav.headerRoot}>
      <div className={nav.headerWrapper}>
        
     {/* LOGO */}
        <Link href="/" className={nav.logoContainer}>
          <Image 
            src="/logo.png" 
            alt="Airbnb Logo"
            h={100}         
            w="auto"        
            fit="contain"   
          />
          
        </Link>

       
        <div className={nav.center}>
          <Tabs defaultValue="stays" variant="unstyled" classNames={{ list: nav.tabsList, tab: nav.tab }}>
            <Tabs.List>
              <Tabs.Tab value="stays">
                <div className={nav.tabContent}>
                  <IconHome size={24} stroke={1.5} className={nav.tabIcon} />
                  <span>Nơi lưu trú</span>
                </div>
              </Tabs.Tab>

              <Tabs.Tab value="experiences">
                <div className={nav.tabContent}>
                  <div className={nav.iconWrapper}>
                    <IconBalloon size={24} stroke={1.5} className={nav.tabIcon} />
                    <span className={nav.badge}>MỚI</span>
                  </div>
                  <span>Trải nghiệm</span>
                </div>
              </Tabs.Tab>

              <Tabs.Tab value="services">
                <div className={nav.tabContent}>
                  <div className={nav.iconWrapper}>
                    <IconArmchair size={24} stroke={1.5} className={nav.tabIcon} />
                    <span className={nav.badge}>MỚI</span>
                  </div>
                  <span>Dịch vụ</span>
                </div>
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </div>

        <div className={nav.right}>
          <Link href="/host" className={nav.hostLink}>
            Trở thành host
          </Link>

          <div className={nav.globeBtn}>
            <IconWorld size={18} stroke={1.5} />
          </div>
         <Menu shadow="md" width={200} position="bottom-end" radius="lg">
            <Menu.Target>
              <button className={nav.profileBtn}>
                <IconMenu2 size={18} stroke={2} />
                {user?.avatar ? (
                  <Avatar src={user.avatar} size={30} radius="xl" />
                ) : (
                   
                  <IconUserCircle size={32} color="#717171" style={{marginLeft: 8}}/>
                )}
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              {user ? (
                <>
                  <Menu.Item fw={700}>Tin nhắn</Menu.Item>
                  <Menu.Item fw={700} component={Link} href="/history">Chuyến đi</Menu.Item>
                  <Menu.Item fw={700}>Danh sách yêu thích</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item component={Link} href="/profile">Tài khoản</Menu.Item>
                  {user.role === "ADMIN" && (
                    <>
                      <Menu.Divider />
                      <Menu.Item 
                        component={Link} 
                        href="/admin"
                        fw={700}
                        style={{ color: '#e74c3c' }}
                      >
                        🛠️ Admin Panel
                      </Menu.Item>
                    </>
                  )}
                  <Menu.Divider />
                  <Menu.Item onClick={logout} color="red">Đăng xuất</Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item component={Link} href="/login" fw={700}>Đăng nhập</Menu.Item>
                  <Menu.Item component={Link} href="/signup">Đăng ký</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item>Cho thuê nhà</Menu.Item>
                  <Menu.Item>Tổ chức trải nghiệm</Menu.Item>
                </>
              )}
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </header>
  );
}