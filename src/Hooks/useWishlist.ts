import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
  cleanWishListProductFullInfo,
  getWishListItems
} from "../Redux/wishList/wishListSlice";
import { useEffect } from "react";
const useWishlist = () => {
  const cartItems = useAppSelector((State) => State.cart.items);
  const wishListItems = useAppSelector((State) => State.wishList.productsId);
  const dispatch = useAppDispatch();
  const { productFullInfo, loading, error } = useAppSelector(
    (state) => state.wishList
  );

  const records = productFullInfo.map((record) => {
    return {
      ...record,
      quantity: cartItems[record.id] || 0,
      isLiked: wishListItems.includes(record.id),
      isAuth: wishListItems.includes(record.id)
    };
  });

  useEffect(() => {
    const promise=dispatch(getWishListItems("productFullInfo"));
    return () => {
      promise.abort();
      dispatch(cleanWishListProductFullInfo());
    };
  }, [dispatch]);
    return { error, records, loading };
};

export default useWishlist;
