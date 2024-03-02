export type NoteInput = {
  content: string;
};

export type Note = {
  id: string;
  createdAt: string;
  updatedAt: string;
} & NoteInput;

export const initialNotes: Note[] = [];
