import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productType } from "../../../Tyepes/productType";
import { RootState } from "../../store";
type TRespons = productType[];
type TDataType = "productIds" | "productFullInfo";
const getWishListItems = createAsyncThunk(
  "wishlist/getWishListItems",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `https://ecommercserver.onrender.com/wishList?userId=${auth.user?.id}`,
        { signal }
      );

      if (!userWishlist.data.length) {
        return { data: [], dataType: "empty" };
      } else {
        if (dataType === "productIds") {
          const concatenatedItemsId = userWishlist.data.map(
            (ele) => ele?.productId
          );
          return { data: concatenatedItemsId, dataType: "productIds" };
        } else {
          const concatenatedItemsId = userWishlist.data
            .map((ele) => `id=${ele?.productId}`)
            .join("&");

          const respons = await axios.get<TRespons>(
            `https://ecommercserver.onrender.com/products?${concatenatedItemsId}`
          );

          return { data: respons?.data, dataType: "productFullInfo" };
        }
      }
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

export default getWishListItems;
