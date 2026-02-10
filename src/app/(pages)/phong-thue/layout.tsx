import { Loader } from "@mantine/core";
import React, { Suspense } from "react";

export default function PhongThueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <>
          <Loader size={40} />
        </>
      }
    >
      {children}
    </Suspense>
  );
}
