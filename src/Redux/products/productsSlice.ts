import { createSlice } from "@reduxjs/toolkit";
import thunkGetProducts from "./thunk/thunkGetProducts";
import { loadingType } from "../../Tyepes/sharedTypes";

import { productType } from "../../Tyepes/productType";
interface IProductState {
  records: productType[];
  loading: loadingType;
  error: string | null;
}

const initialState: IProductState = {
  records: [],
  loading: "idle",
  error: null
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanub: (state) => {
      state.records = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(thunkGetProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(thunkGetProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(thunkGetProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string")
        state.error = action.payload;
    });
  }
});
 export const {productsCleanub}= productSlice.actions
export { thunkGetProducts };
export default productSlice.reducer;
