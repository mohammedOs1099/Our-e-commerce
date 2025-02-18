import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
type TFormData = {
  email: string;
  fristName: string;
  lastName: string;
  password: string;
};
const thunkRegister = createAsyncThunk(
  "auth/thunkRegister",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const response = await axios.post(
        "https://ecommercserver.onrender.com/users",
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
export default thunkRegister;
