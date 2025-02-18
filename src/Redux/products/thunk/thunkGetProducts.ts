import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { productType } from "../../../Tyepes/productType";
type TResponse = productType[];
const thunkGetProducts = createAsyncThunk(
  "products/thunkGetProducts",
  async (prefix: string = "", thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    const url = prefix
      ? `https://ecommercserver.onrender.com/products?cat_prefix=${encodeURIComponent(
          prefix
        )}`
      : `https://ecommercserver.onrender.com/products`;
    try {
      const response = await axios.get<TResponse>(url, { signal });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue(" An unexpected error ");
      }
    }
  }
);

export default thunkGetProducts;
