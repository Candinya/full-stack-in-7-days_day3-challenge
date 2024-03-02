import {
  Anchor,
  Box,
  Code,
  CopyButton,
  Divider,
  List,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";

const AboutPage = () => (
  <Box>
    <Title order={2}>关于这个项目</Title>
    <Text mt="md">
      这个是{" "}
      <Anchor
        href="https://candinya.github.io/full-stack-in-7-days/hello-browser/"
        target="_blank"
      >
        7天全栈计划 - Day 3
      </Anchor>{" "}
      的课后挑战样例代码，实现了一个纯本地运行的简单的记事本。
    </Text>
    <Text mt="sm">
      代码本身并不完美，存在非常多妥协，并且可能会存在一些疏漏。
      如果您有任何其他想法，欢迎随时开一个 PR 来帮助我们一起进步。
    </Text>

    <Divider my="sm" />

    <Text>
      默认的登录账号与密码硬编码在文件 <Code>src/api/user.ts</Code>{" "}
      中，它们分别是：（点击复制）
    </Text>
    <List mt="sm">
      <List.Item>
        账号：{" "}
        <CopyButton value="Candinya">
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? "已复制" : "点击复制"}
              withArrow
              position="right"
            >
              <UnstyledButton onClick={copy}>
                <Code>Candinya</Code>
              </UnstyledButton>
            </Tooltip>
          )}
        </CopyButton>
      </List.Item>
      <List.Item>
        密码：{" "}
        <CopyButton value="Dem0P@55">
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? "已复制" : "点击复制"}
              withArrow
              position="right"
            >
              <UnstyledButton onClick={copy}>
                <Code>Dem0P@55</Code>
              </UnstyledButton>
            </Tooltip>
          )}
        </CopyButton>
      </List.Item>
    </List>
  </Box>
);

export default AboutPage;
