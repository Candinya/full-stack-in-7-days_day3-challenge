import { useSelector } from "react-redux";
import type { RootState } from "@/store.ts";
import SingleNote from "@/components/SingleNote.tsx";
import type { Note } from "@/types/note.ts";
import { useMemo } from "react";

interface NotesListProps {
  editNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  isAsc: boolean;
}
const NotesList = ({ editNote, deleteNote, isAsc }: NotesListProps) => {
  const notes = useSelector((state: RootState) => state.notes);
  const sortedNotes = useMemo(
    () =>
      [...notes].sort((a, b) => {
        return isAsc
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }),
    [notes, isAsc],
  );

  return sortedNotes.map((note) => (
    <SingleNote
      key={note.id}
      content={note.content}
      onEdit={() => editNote(note)}
      onDelete={() => deleteNote(note.id)}
    />
  ));
};

export default NotesList;
