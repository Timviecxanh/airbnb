"use client";
import { useEffect, useState } from "react";
import { IconChevronUp } from "@tabler/icons-react";

export default function BackToTopIcon() {
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
        borderRadius: "50%",
        width: 56,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(102,126,234,0.18)",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s"
      }}
      aria-label="Back to top"
    >
      <IconChevronUp size={38} stroke={3} />
    </button>
  );
}
