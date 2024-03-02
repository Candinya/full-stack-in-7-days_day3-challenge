import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import type { Note } from "@/types/note.ts";
import { ActionIcon, Flex, Group } from "@mantine/core";
import {
  IconPlus,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import NotesList from "@/components/NotesList.tsx";
import EditNoteModal from "@/components/EditNoteModal.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store.ts";
import { createNote, deleteNote, updateNote } from "@/slices/notesSlice.ts";
import API from "@/api";
import { actionIconStyle } from "@/constants/actionIconStyle.ts";

const NotesContainer = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const [
    isEditNoteModalOpen,
    { open: openEditNoteModal, close: closeEditNoteModal },
  ] = useDisclosure(false);

  const [editNote, setEditNote] = useState<Note | undefined>(undefined);
  const [isNoteSortAsc, setIsNoteSortAsc] = useState(false);

  const startCreateOrEditNote = (note?: Note) => {
    setEditNote(note);
    openEditNoteModal();
  };

  const confirmCreateOrEditNote = (content: string) => {
    if (editNote) {
      API.notes
        .updateNote(user.apiKey!, editNote.id, {
          content,
        })
        .then((note) => {
          dispatch(updateNote(note));
        });
    } else {
      API.notes
        .createNote(user.apiKey!, {
          content,
        })
        .then((note) => {
          dispatch(createNote(note));
        });
    }
    closeEditNoteModal();
  };

  const deleteNoteByID = (id: string) => {
    API.notes.deleteNote(user.apiKey!, id).then(() => {
      dispatch(deleteNote(id));
    });
  };

  return (
    <>
      <Group>
        <Flex w="100%" direction="row" gap="sm" justify="end">
          <ActionIcon
            variant="filled"
            size="lg"
            onClick={() => startCreateOrEditNote()}
          >
            <IconPlus style={actionIconStyle} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            size="lg"
            color="green"
            onClick={() => setIsNoteSortAsc(!isNoteSortAsc)}
          >
            {isNoteSortAsc ? (
              <IconSortAscending style={actionIconStyle} stroke={1.5} />
            ) : (
              <IconSortDescending style={actionIconStyle} stroke={1.5} />
            )}
          </ActionIcon>
        </Flex>
        <Flex w="100%" direction="column" gap="sm">
          <NotesList
            editNote={startCreateOrEditNote}
            deleteNote={deleteNoteByID}
            isAsc={isNoteSortAsc}
          />
        </Flex>
      </Group>
      <EditNoteModal
        opened={isEditNoteModalOpen}
        close={closeEditNoteModal}
        isEdit={!!editNote}
        content={editNote?.content}
        confirm={confirmCreateOrEditNote}
      />
    </>
  );
};

export default NotesContainer;
