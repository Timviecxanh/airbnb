// app/layout.tsx
"use client";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("./components/Header/header.jsx"), { ssr: false });
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Detect current path
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <MantineProvider defaultColorScheme="light">
          <Notifications />
          {/* Header xuất hiện ở mọi trang */}
          <Header />
          <div style={{ paddingTop: isHome ? 0 : "80px" }}>
            {children}
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
