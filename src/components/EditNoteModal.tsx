import { Button, Group, Modal, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

interface EditNoteModalProps {
  opened: boolean;
  close: () => void;
  isEdit: boolean;
  content?: string;
  confirm: (content: string) => void;
}
const EditNoteModal = ({
  opened,
  close,
  isEdit,
  content,
  confirm,
}: EditNoteModalProps) => {
  const editNoteForm = useForm({
    initialValues: {
      content: "",
    },
  });

  useEffect(() => {
    editNoteForm.setInitialValues({
      content: content || "",
    });
  }, [content]);

  useEffect(() => {
    editNoteForm.reset();
  }, [opened]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`${isEdit ? "编辑" : "新建"}笔记`}
    >
      <form
        onSubmit={editNoteForm.onSubmit((values) => confirm(values.content))}
      >
        <Textarea
          placeholder="随便写点什么..."
          autosize
          minRows={4}
          resize="vertical"
          required
          {...editNoteForm.getInputProps("content")}
          data-autofocus
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">确认</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default EditNoteModal;
