import { productType } from "../../../Tyepes/productType";
import CartItem from "../CartItem/CartItem";
import stayle from "./CartList.module.css";

type TProps = {
  products: productType[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeCartItem:(id:number)=> void;
};
const CartList = ({
  products,
  changeQuantityHandler,
  removeCartItem
}: TProps) => {
  const listRender = products.map((product) => (
    <CartItem
      key={product.id}
      {...product}
      changeQuantityHandler={changeQuantityHandler}
      removeCartItem={removeCartItem}
    />
  ));

  return (
    <>
      <div className={`${stayle.cartList}  my-3 `}>{listRender}</div>
    </>
  );
};

export default CartList;
