import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string | null;
  displayName: string | null;
  email: string | null;
}

const initialUserState: UserState = {
  userId: null,
  displayName: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => ({ ...state, ...action.payload }),
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
