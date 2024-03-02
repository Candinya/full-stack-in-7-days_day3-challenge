import type { Note, NoteInput } from "@/types/note.ts";
import { LocalStorageKeyOfflineNotes } from "@/constants/localStorageKeys.ts";

const getNotes = async (key: string): Promise<Note[]> => {
  // 暂时没有后端，所以只能先本地处理
  console.log(key); // 其实用不上
  const notesJson = localStorage.getItem(LocalStorageKeyOfflineNotes);
  if (notesJson === null) {
    return [];
  } else {
    return JSON.parse(notesJson);
  }
};

const createNote = async (
  key: string,
  noteContent: NoteInput,
): Promise<Note> => {
  // 暂时没有后端，所以只能先本地处理
  // 对于远端来说不需要这些请求，但因为本地的存储和状态分离，只能全部本地处理
  const currentNotes = await getNotes(key);
  const newNote = {
    id: new Date().getTime().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...noteContent,
  };
  // 保存一下
  currentNotes.push(newNote);
  localStorage.setItem(
    LocalStorageKeyOfflineNotes,
    JSON.stringify(currentNotes),
  );
  return newNote;
};

const updateNote = async (
  key: string,
  id: string,
  noteContent: NoteInput,
): Promise<Note> => {
  // 暂时没有后端，所以只能先本地处理
  // 对于远端来说不需要这些请求，但因为本地的存储和状态分离，只能全部本地处理
  const currentNotes = await getNotes(key);
  // 查找对应 id 的 note ，其实和状态管理里的处理非常像
  const toUpdateNoteIndex = currentNotes.findIndex((note) => note.id === id);
  if (toUpdateNoteIndex === -1) {
    throw new Error("没有指定 id 的笔记");
  }
  const updatedNote = {
    id: id,
    createdAt: currentNotes[toUpdateNoteIndex].createdAt,
    updatedAt: new Date().toISOString(),
    ...noteContent,
  };
  // 保存一下
  currentNotes[toUpdateNoteIndex] = updatedNote;
  localStorage.setItem(
    LocalStorageKeyOfflineNotes,
    JSON.stringify(currentNotes),
  );
  return updatedNote;
};

const deleteNote = async (key: string, id: string) => {
  // 暂时没有后端，所以只能先本地处理
  // 对于远端来说不需要这些请求，但因为本地的存储和状态分离，只能全部本地处理
  const currentNotes = await getNotes(key);
  // 查找对应 id 的 note ，其实和状态管理里的处理非常像
  const toDeleteNoteIndex = currentNotes.findIndex((note) => note.id === id);
  if (toDeleteNoteIndex === -1) {
    throw new Error("没有指定 id 的笔记");
  }
  // 保存一下
  currentNotes.splice(toDeleteNoteIndex, 1);
  localStorage.setItem(
    LocalStorageKeyOfflineNotes,
    JSON.stringify(currentNotes),
  );
};

export default {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
