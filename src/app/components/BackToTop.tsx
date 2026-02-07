"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        right: 24,
        bottom: 32,
        zIndex: 9999,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        border: "none",
        borderRadius: 999,
        padding: "12px 20px",
        fontWeight: 700,
        fontSize: 18,
        boxShadow: "0 4px 16px rgba(102,126,234,0.18)",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s"
      }}
      aria-label="Back to top"
    >
      ↑ Lên đầu trang
    </button>
  );
}
