import { createSlice } from "@reduxjs/toolkit";
import wishListAction from "./thunk/wishListAction";
import getWishListItems from "./thunk/getWishListItems";
import { productType } from "../../Tyepes/productType";

import { loadingType } from "../../Tyepes/sharedTypes";
import { logOut } from "../auth/authSlice";
interface IWishListState {
  productsId: number[];
  error: null | string;
  productFullInfo: productType[];
  loading: loadingType;
}
const initialState: IWishListState = {
  productsId: [],
  error: null,
  productFullInfo: [],
  loading: "idle"
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    cleanWishListProductFullInfo: (state) => {
      state.productFullInfo = [];
    }
  },
  extraReducers: (builder) => {
    //   get WishList
    builder.addCase(getWishListItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getWishListItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload.dataType === "productFullInfo") {
        state.productFullInfo = action.payload.data as productType[];
      } else if (action.payload.dataType === "productIds") {
        state.productsId = action.payload.data as number[];
      } else {
        state.productsId = [];
        state.productFullInfo = [];
      }
    });
    builder.addCase(getWishListItems.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string")
        state.error = action.payload;
    });
    // add and delete

    builder.addCase(wishListAction.pending, (state) => {
      state.error = null;
    });
    builder.addCase(wishListAction.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.productsId.push(action.payload.id);
      } else {
        state.productsId = state.productsId.filter(
          (id) => id !== action.payload.id
        );
        state.productFullInfo = state.productFullInfo.filter(
          (product) => product.id !== action.payload.id
        );
      }
    });
    builder.addCase(wishListAction.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // clean wishlist
    builder.addCase(logOut, (state) => {
      state.productFullInfo = [];
      state.productsId = [];
    });
  }
});
export const { cleanWishListProductFullInfo } = wishListSlice.actions;
export { wishListAction, getWishListItems };
export default wishListSlice.reducer;
