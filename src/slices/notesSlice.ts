import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Note } from "@/types/note.ts";
import { initialNotes } from "@/types/note.ts";

const noteSlice = createSlice({
  name: "note",
  initialState: initialNotes,
  reducers: {
    setNotes: (_, action: PayloadAction<Note[]>) => {
      return action.payload;
    },
    createNote: (state, action: PayloadAction<Note>) => {
      // 直接更新状态
      state.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      // 通过 id 查找
      const toUpdateNoteIndex = state.findIndex(
        (note) => note.id === action.payload.id,
      );
      if (toUpdateNoteIndex === -1) {
        throw new Error("没有指定 id 的笔记");
      }
      // 更新状态
      state.splice(toUpdateNoteIndex, 1, action.payload);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      // 通过 id 查找
      const toDeleteNoteIndex = state.findIndex(
        (note) => note.id === action.payload,
      );
      if (toDeleteNoteIndex === -1) {
        throw new Error("没有指定 id 的笔记");
      }
      // 更新状态
      state.splice(toDeleteNoteIndex, 1);
    },
  },
});

export const { setNotes, createNote, updateNote, deleteNote } =
  noteSlice.actions;

export default noteSlice.reducer;
