import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store.ts";
import { useState } from "react";
import { Avatar, Button, Group, Menu, rem, Text } from "@mantine/core";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import { resetUser } from "@/slices/userSlice.ts";
import API from "@/api";
import { useNavigate } from "react-router-dom";

const User = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const nav = useNavigate();

  const toLoginPage = () => {
    nav("/login");
  };

  const logout = () => {
    API.user.userLogout().then(() => {
      dispatch(resetUser());
    });
  };

  return user.isLoggedIn ? (
    <Menu
      width={260}
      position="bottom-end"
      onClose={() => setIsMenuOpen(false)}
      onOpen={() => setIsMenuOpen(true)}
      withinPortal
    >
      <Menu.Target>
        <Button
          variant="outline"
          rightSection={
            <IconChevronDown
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          }
          disabled={isMenuOpen}
          fullWidth
        >
          <Group gap={7}>
            <Avatar radius="xl" size={20} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.username}
            </Text>
          </Group>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          onClick={logout}
        >
          退出登录
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <Button onClick={toLoginPage}>登录</Button>
  );
};

export default User;
