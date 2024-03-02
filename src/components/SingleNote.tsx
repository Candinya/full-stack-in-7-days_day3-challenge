import { ActionIcon, Flex, Group, Menu, Paper, rem, Text } from "@mantine/core";
import { IconDots, IconPencil, IconTrash } from "@tabler/icons-react";
import { actionIconStyle } from "@/constants/actionIconStyle.ts";

interface NoteProps {
  content: string;
  onEdit?: () => void;
  onDelete?: () => void;
}
const SingleNote = ({ content, onEdit, onDelete }: NoteProps) => (
  <Paper shadow="xs" p="sm" withBorder>
    <Flex direction="row" justify="space-between">
      <Group p="lg">
        <Text
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          {content}
        </Text>
      </Group>

      <Group>
        <Menu
          trigger="hover"
          position="bottom-end"
          withArrow
          arrowPosition="center"
        >
          <Menu.Target>
            <ActionIcon
              variant="outline"
              style={{
                border: 0,
                alignSelf: "end",
              }}
              color="gray"
            >
              <IconDots style={actionIconStyle} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconPencil style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={onEdit}
            >
              编辑
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={onDelete}
            >
              删除
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Flex>
  </Paper>
);

export default SingleNote;
