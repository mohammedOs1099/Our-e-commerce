import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import { productType } from "../../../Tyepes/productType";
type TRespons = productType[];
const getCartItem = createAsyncThunk(
  "Cart/getCartItem",
  async (_, APIThunk) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = APIThunk;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);
    if (itemsId.length <= 0) {
      return fulfillWithValue([]);
    }
    try {
      const itemsIds = itemsId.map((el) => `id=${el}`).join("&");
      const respons = await axios.get<TRespons>(
        `https://ecommercserver.onrender.com/products?${itemsIds}`,
        { signal }
      );
      return respons?.data;
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
export default getCartItem;
