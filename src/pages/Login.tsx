import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { LoginFormInput } from "@/types/loginFormInput.ts";
import { notifications } from "@mantine/notifications";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store.ts";
import { useEffect } from "react";
import { setUser } from "@/slices/userSlice.ts";
import { useNavigate } from "react-router-dom";
import API from "@/api";

const LoginPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const nav = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      // 重定向到主页
      nav("/");
    }
  }, [isLoggedIn]);

  const loginForm = useForm<LoginFormInput>({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const loginSubmit = (values: LoginFormInput) => {
    API.user
      .userLogin(values)
      .then((state) => {
        dispatch(setUser(state));
      })
      .catch((e) => {
        notifications.show({
          color: "red",
          title: "登录失败...",
          message: e.message,
        });
      });
  };

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={loginForm.onSubmit(loginSubmit)}>
        <TextInput
          withAsterisk
          label="用户名"
          required
          {...loginForm.getInputProps("username")}
        />

        <PasswordInput
          withAsterisk
          label="密码"
          required
          {...loginForm.getInputProps("password")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">登录</Button>
        </Group>
      </form>
    </Box>
  );
};

export default LoginPage;
