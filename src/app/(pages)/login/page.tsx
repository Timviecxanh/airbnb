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
// "use client";

// import {
//   Button,
//   Checkbox,
//   Image,
//   Paper,
//   PasswordInput,
//   Text,
//   TextInput,
//   Title,
// } from "@mantine/core";
// import classes from "@/app/(pages)/login/AuthenticationeImage.module.css";
// import ButtonSingup from "@/app/components/Signup/ButtonSignup";
// // import { useForm } from "@mantine/form";
// // import { TextInput, Button } from "@mantine/core";
// import { authService } from "@/app/services/login.service";
// import { useRouter } from "next/navigation";
// type LoginValues = {
//   email: string;
//   password: string;
// };

// export default function AuthenticationImage() {
//   const router = useRouter();

//   const handleSubmit = async (values: LoginValues) => {
//     try {
//       const res = await authService.login(values);

//       localStorage.setItem("token", res.content.token);
//       localStorage.setItem("user", JSON.stringify(res.content.user));
//       alert("Dang Nhap Thanh Cong");

//       router.push("/");
//       router.refresh();
//     } catch (e: any) {
//       console.log("Login fail:", e);
//     }
//   };
//   const from = useForm<LoginValues>({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validate: {
//       email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email sai"),
//       password: (value) => (value.length >= 0 ? null : "Tối thiểu 6 ký tự"),
//     },
//   });

//   return (
//     <form onSubmit={from.onSubmit(handleSubmit)}>
//       <div className={classes.wrapper}>
//         <Paper className={classes.form}>
//           <Title order={2} className={classes.title}>
//             Welcome back to Mantine!
//           </Title>

//           <TextInput
//             label="Email address"
//             placeholder="hello@gmail.com"
//             size="md"
//             radius="md"
//           />
//           <PasswordInput
//             label="Password"
//             placeholder="Your password"
//             mt="md"
//             size="md"
//             radius="md"
//           />
//           <Checkbox label="Keep me logged in" mt="xl" size="md" />
//           <Button fullWidth mt="xl" size="md" radius="md">
//             Login
//           </Button>

//           <Text ta="center" mt="md">
//             Don&apos;t have an account?
//             <ButtonSingup></ButtonSingup>
//           </Text>
//         </Paper>
//       </div>
//     </form>
//   );
// }
