import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "../../Tyepes/orderType";
import { loadingType } from "../../Tyepes/sharedTypes";
import thunkPlaceOrders from "./Thunk/thunkPlaceOrders";
import thunkGetUserAuthOrder from "./Thunk/thunkGetUserAuthOrder";
interface IInitialState {
  orderList: TOrder[];
  loading: loadingType;
  error: string | null;
}
const initialState: IInitialState = {
  orderList: [],
  loading: "idle",
  error: null
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderState: (state) => {
          state.loading = "idle";
          state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(thunkPlaceOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(thunkPlaceOrders.fulfilled, (state) => {
      state.loading = "succeeded";
    });

    builder.addCase(thunkPlaceOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string")
        state.error = action.payload;
    });
    //   get authUserOrder
    builder.addCase(thunkGetUserAuthOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(thunkGetUserAuthOrder.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orderList = action.payload;
    });

    builder.addCase(thunkGetUserAuthOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string")
        state.error = action.payload;
    });
  }
});

export { thunkGetUserAuthOrder, thunkPlaceOrders };
export const { resetOrderState } = ordersSlice.actions;
export default ordersSlice.reducer;
