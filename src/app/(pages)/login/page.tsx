"use client";

import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { authService } from "@/app/services/login.service";
import { useRouter } from "next/navigation";
type LoginValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const from = useForm<LoginValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email sai"),
      password: (value) => (value.length >= 0 ? null : "Tối thiểu 6 ký tự"),
    },
  });

  const handleSubmit = async (values: LoginValues) => {
    try {
      const res = await authService.login(values);

      localStorage.setItem("token", res.content.token);
      localStorage.setItem("user", JSON.stringify(res.content.user));
      alert("Dang Nhap Thanh Cong");

      router.push("/");
      router.refresh();
    } catch (e: any) {
      console.log("Login fail:", e);
    }
  };

  return (
    <form onSubmit={from.onSubmit(handleSubmit)}>
      <TextInput label="Email" {...from.getInputProps("email")} />
      <TextInput label="Password" {...from.getInputProps("password")} />

      <Button type="submit" disabled={!from.isValid()}>
        Đăng nhập
      </Button>
    </form>
  );
}
