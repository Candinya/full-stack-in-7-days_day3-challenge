import { useDisclosure } from "@mantine/hooks";
import { AppShell, LoadingOverlay } from "@mantine/core";
import Header from "@/components/Header.tsx";
import Router from "@/Router.tsx";
import Nav from "@/components/Nav.tsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store.ts";
import API from "@/api";
import { setUser } from "@/slices/userSlice.ts";

const App = () => {
  const [opened, { toggle }] = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 初始化用户会话状态
    API.user.checkLoginState().then((state) => {
      dispatch(setUser(state));
      setIsLoading(false);
    });
  }, []);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Nav />
      </AppShell.Navbar>

      <AppShell.Main>
        {isLoading ? (
          <LoadingOverlay
            visible={true}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
        ) : (
          <Router />
        )}
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
