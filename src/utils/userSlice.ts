import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

interface UserState {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

const initialState: UserState = {
  id: "",
  name: "",
  email: "",
  accessToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
        console.log(action.payload);
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
    logout(state) {
      state.id = "";
      state.name = "";
      state.email = "";
      state.accessToken = "";
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
