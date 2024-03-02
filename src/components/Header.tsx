import { Burger, Flex, Group, Title } from "@mantine/core";
import { IconNotes } from "@tabler/icons-react";
import User from "@/components/User.tsx";
import ColorSchemeToggle from "@/components/ColorSchemeToggle.tsx";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}
const Header = ({ opened, toggle }: HeaderProps) => (
  <Group h="100%" px="md">
    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
    <Group justify="space-between" style={{ flex: 1 }}>
      <Group>
        <IconNotes size={30} />
        <Title order={1} size="h2">
          记事本
        </Title>
      </Group>
      <Flex ml="xl" visibleFrom="sm" gap="sm">
        <User />
        <ColorSchemeToggle />
      </Flex>
    </Group>
  </Group>
);

export default Header;
