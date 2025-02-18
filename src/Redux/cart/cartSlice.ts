import { createSlice } from "@reduxjs/toolkit";
import { productType } from "../../Tyepes/productType";
import getCartItem from "./thunk/getCartItems";
import { loadingType } from "../../Tyepes/sharedTypes";
interface ICartState {
  items: { [key: string]: number };
  productFillInfo: productType[];
  loading: loadingType;
  error: null | string; // Error message if loading fails  // Error message if loading fails  // Error message if loading fails   // Error message if loading fails   // Error message if loading fails   // Error message if loading fails   // Error message if loading fails   // Error message if loading fails   // Error message if loading fails   // Error message if loading fails   // Error message if loading fails   // Error message if loading fails   // Error message if loading fails   //
}

const initialState: ICartState = {
  items: {},
  productFillInfo: [],
  loading: "idle",
  error: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    changeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    
    cleanCartProductfillInfo: (state) => {
      state.productFillInfo = [];
    },
    removeCartItme: (state, action) => {
      delete state.items[action.payload];
      state.productFillInfo = state.productFillInfo.filter(
        (product) => product.id !== action.payload
      );
    },
    clearCartAfterPlaceOrder: (state) => {
      state.productFillInfo = [];
      state.items ={};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItem.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getCartItem.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productFillInfo = action.payload;
    });
    builder.addCase(getCartItem.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string")
        state.error = action.payload;
    });
  }
});
export { getCartItem };
export const { addToCart, changeQuantity, removeCartItme, cleanCartProductfillInfo,   clearCartAfterPlaceOrder } =
  cartSlice.actions;
export default cartSlice.reducer;
