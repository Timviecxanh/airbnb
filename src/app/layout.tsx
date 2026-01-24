// app/layout.tsx
import "@mantine/core/styles.css";

import "@mantine/dates/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
