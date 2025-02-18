import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";

const thunkPlaceOrders = createAsyncThunk(
  "orders/thunkPlaceOrders",
  async (subTotalPraice: number, thunkApi) => {
    const { getState, rejectWithValue } = thunkApi;
    const { cart, auth } = getState() as RootState;
    const orderList = cart.productFillInfo.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: cart.items[product.id],
        img: product.img
      };
    });
    try {
      const res = await axios.post(
        "https://ecommercserver.onrender.com/orders",
        {
          userId: auth.user?.id,
          items: orderList,
          subTotalPraice
        }
      );
      return res.data;
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

export default thunkPlaceOrders;
