import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

const wishListAction = createAsyncThunk(
  "wishList/wishListAction",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const isRecordExsit = await axios.get(
        `https://ecommercserver.onrender.com/wishList?userId=${auth.user?.id}&productId=${id}`
      );

      if (isRecordExsit.data.length > 0) {
        await axios.delete(
          `https://ecommercserver.onrender.com/wishList/${isRecordExsit.data[0].id}`
        );
        return { type: "remove", id };
      } else {
        await axios.post(`https://ecommercserver.onrender.com/wishList`, {
          userId: auth.user?.id,
          productId: id
        });
        return { type: "add", id };
      }
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
export default wishListAction;
