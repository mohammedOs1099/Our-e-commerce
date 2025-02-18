import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
  productsCleanub,
  thunkGetProducts
} from "../Redux/products/productsSlice";
import { useParams } from "react-router-dom";

const useGetProducts = () => {
  const prames = useParams();
  const { records, loading, error } = useAppSelector(
    (state) => state.catProducts
  );
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((State) => State.cart.items);

  const wishListItems = useAppSelector((State) => State.wishList.productsId);

  const productFullInfo = records.map((record) => {
    return {
      ...record,
      quantity: cartItems[record.id] || 0,
      isLiked: wishListItems.includes(record.id),
      isAuth: accessToken ? true : false
    };
  });

  useEffect(() => {
    const prefix = prames.prefix as string;

    const promise = dispatch(thunkGetProducts(prefix?.toLocaleLowerCase()));
    return () => {
      promise.abort();
      dispatch(productsCleanub());
    };
  }, [dispatch, prames]);

  return { loading, error, productFullInfo };
};

export default useGetProducts;
