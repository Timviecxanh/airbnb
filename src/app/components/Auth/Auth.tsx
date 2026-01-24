"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (authorized === null) return null;

  return authorized ? <>{children}</> : null;
}
