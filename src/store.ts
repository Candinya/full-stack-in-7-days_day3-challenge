import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/slices/userSlice.ts";
import notesSlice from "@/slices/notesSlice.ts";

export const store = configureStore({
  reducer: {
    user: userSlice,
    notes: notesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
