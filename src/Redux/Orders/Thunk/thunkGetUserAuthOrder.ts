import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import { TOrder } from "../../../Tyepes/orderType";
type TRes = TOrder[];
const thunkGetUserAuthOrder = createAsyncThunk(
  "getorder/thunkGetUserAuthOrder",
  async (_, thunkAPI) => {
    const { signal, getState, rejectWithValue } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const response = await axios.get<TRes>(
        `https://ecommercserver.onrender.com/orders?userId=${auth.user?.id}`,
        { signal }
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

export default thunkGetUserAuthOrder;
