import { createSlice } from "@reduxjs/toolkit";
import { loadingType } from "../../Tyepes/sharedTypes";
import thunkRegister from "./thunk/thunkRegister";
import thunkLogin from "./thunk/thunkLogin";
interface IAuthState {
  loading: loadingType;
  error: string | null;
  user: {
    id: number;
    lastName: string;
    fristName: string;
    email: string;
  } | null;
  accessToken: string | null;
}

const initialState: IAuthState = {
  loading: "idle",
  error: null,
  user: null,
  accessToken: null
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
      },
      logOut: (state) => {
          state.user = null;
          state.accessToken = null;
 
       }
  },
  extraReducers: (builder) => {
    builder.addCase(thunkRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(thunkRegister.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(thunkRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string")
        state.error = action.payload;
    });
    // logging
    builder.addCase(thunkLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(thunkLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(thunkLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string")
        state.error = action.payload;
    });
  }
});
export { thunkRegister, thunkLogin };
 export const { resetUI, logOut } = authSlice.actions;
export default authSlice.reducer;
