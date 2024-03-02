import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "@/types/userState.ts";
import { initialUser } from "@/types/userState.ts";

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setUser: (_, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    resetUser: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
