"use client";

import { useForm } from "@mantine/form";
import { SignupServices } from "@/app/services/signup.service";
import { useRouter } from "next/navigation";

import { TextInput, Button, Group, Radio, Stack } from "@mantine/core";

type SignupValues = {
  // id: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
};

export default function Signup() {
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",

    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "true",
      role: "USER",
    },

    transformValues: (values) => ({
      ...values,
      gender: values.gender === "true",
    }),
  });

  const handleSubmit = async (value: SignupValues) => {
    try {
      await SignupServices.signup(value);

      alert("Đăng ký thành công");

      router.push("/login");
    } catch (e) {
      console.log("Signup fail:", e);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Name"
          placeholder="Nguyen"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <TextInput
          label="Email"
          type="email"
          placeholder="nguyenvana@gmail.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

        <TextInput
          label="Password"
          type="password"
          placeholder="1-6 ký tự"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <TextInput
          label="Phone Number"
          placeholder="10 số"
          key={form.key("phone")}
          {...form.getInputProps("phone")}
        />

        <TextInput
          label="Birthday"
          placeholder="dd-mm-yyyy"
          key={form.key("birthday")}
          {...form.getInputProps("birthday")}
        />

        <Radio.Group
          label="Giới tính"
          key={form.key("gender")}
          {...form.getInputProps("gender")}
        >
          <Group mt="xs">
            <Radio value="true" label="Nam" />
            <Radio value="false" label="Nữ" />
          </Group>
        </Radio.Group>

        <Button type="submit" mt="md" fullWidth>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
