import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthSliceState, IUser } from "../Types/sliceStates";
const initialState: IAuthSliceState = {
  user: JSON.parse(
    localStorage.getItem("user") ||
      '{"email": "","uid": "","displayName": "","photoURL": ""}'
  ),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandle: (state, action: PayloadAction<IUser>) => {
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
      state.user.displayName = action.payload.displayName;
      state.user.photoURL = action.payload.photoURL;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logOutHandle: (state) => {
      state.user.email = "";
      state.user.uid = "";
      state.user.displayName = "";
      state.user.photoURL = "";
      localStorage.removeItem("user");
    },
  },
});

export const { loginHandle, logOutHandle } = authSlice.actions;

export default authSlice.reducer;
