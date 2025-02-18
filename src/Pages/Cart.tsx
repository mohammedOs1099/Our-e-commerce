import { useCallback, useEffect } from "react";
import SubtotalPrice from "../Components/e-Commerce/SubtotalPrice/SubtotalPraic";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
  changeQuantity,
  cleanCartProductfillInfo,
  getCartItem,
  removeCartItme
} from "../Redux/cart/cartSlice";
import Loading from "../Components/feadback/Loading/Loading";
import CartList from "../Components/e-Commerce/CartList/CartList";
import LottieHandler from "../Components/feadback/LottieHandler/LottieHandler";
import { resetOrderState } from "../Redux/Orders/ordersSlice";

const Cart = () => {
  const { items, loading, error, productFillInfo } = useAppSelector(
    (state) => state.cart
  );
  const { loading: ordersLoading } = useAppSelector((state) => state.orders);
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const products = productFillInfo.map((product) => ({
    ...product,
    quantity: items[product.id]
  }));
  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(changeQuantity({ id, quantity }));
    },
    [dispatch]
  );
  const removeCartItem = useCallback(
    (id: number) => {
      dispatch(removeCartItme(id));
    },
    [dispatch]
  );
  useEffect(() => {
    const promise = dispatch(getCartItem());
    return () => {
      promise.abort();
      dispatch(cleanCartProductfillInfo());
      dispatch(resetOrderState());
    };
  }, [dispatch]);
  return (
    <>
      <Loading loading={loading} error={error}>
        {products.length ? (
          <>
            <CartList
              removeCartItem={removeCartItem}
              products={products}
              changeQuantityHandler={changeQuantityHandler}
            />
            <SubtotalPrice products={products} accessToken={accessToken} />
          </>
        ) : ordersLoading === "succeeded" ? (
          <LottieHandler
            type="sccess"
            message="your order has been placed successfully   "
          />
        ) : (
          <LottieHandler type="empty" message="Your Cart Is Empty!   " />
        )}
      </Loading>
    </>
  );
};

export default Cart;
