import { Flex, Group, NavLink } from "@mantine/core";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { navs } from "@/routes";
import User from "@/components/User.tsx";

const iconStyle = { width: "1rem", height: "1rem" };

const Nav = () => {
  const location = useLocation();
  return (
    <Group
      w="100%"
      justify="space-between"
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Flex direction="column" w="100%">
        {navs.map((route) => (
          <NavLink
            key={route.path}
            label={route.label}
            leftSection={<route.icon style={iconStyle} stroke={1.5} />}
            component={RouterNavLink}
            to={route.path}
            active={location.pathname === route.path}
          />
        ))}
      </Flex>
      <Group my="xl" hiddenFrom="sm" w="100%">
        <User />
      </Group>
    </Group>
  );
};

export default Nav;
