import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
type TLogindata = {
  email: string;
  password: string;
};
type TRespons = {
  accessToken: string;
  user: {
    id: number;
    fristName: string;
    lastName: string;
    email: string;
  };
};

const thunkLogin = createAsyncThunk(
  "auth/thunkLogin",
  async (formData: TLogindata, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const response = await axios.post<TRespons>(
        "https://ecommercserver.onrender.com/login",
        formData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || error.response?.data?.message || error.message
        );
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);
export default thunkLogin;
