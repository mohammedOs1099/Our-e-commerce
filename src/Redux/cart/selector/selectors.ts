import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const totalQuantity = Object.values(items).reduce(
      (total, currentValue) => total + currentValue,
      0
    );
    return totalQuantity;
  }
);
export { getCartTotalQuantitySelector };
