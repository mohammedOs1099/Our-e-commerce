import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { catigoryType } from "../../../Tyepes/categoryType";
type TResponse = catigoryType[];
const thunkGetCategories = createAsyncThunk(
  "categories/thunkGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        "https://ecommercserver.onrender.com/categories"
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || error.response?.data?.message || error.message
        );
      } else {
        return rejectWithValue(" An unexpected error ");
      }
    }
  }
);

export default thunkGetCategories;
