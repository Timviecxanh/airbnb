// hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, logout };
};
