import { Form } from "react-bootstrap";
import styles from "./CartItem.module.css";
import { productType } from "../../../Tyepes/productType";
import { ChangeEvent, memo } from "react";
const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type TCartItemProps = productType & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeCartItem:(id:number)=>void
};
const CartItem = memo(
  ({
    id,
    img,
    price,
    title,
    quantity,
    max,
    changeQuantityHandler,
    removeCartItem
  }: TCartItemProps) => {
    const slectorOptionalNumber = Array(max)
      .fill(0)
      .map((_, index) => {
        const quantity = ++index;
        return <option key={quantity}>{quantity}</option>;
      });
    const changequantity = (event: ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changeQuantityHandler(id, quantity);
    };

    return (
      <>
        <div className={cartItem}>
          <div className={product}>
            <div className={productImg}>
              <img src={img} alt={title} />
            </div>
            <div className={productInfo}>
              <h2>{title}</h2>
              <h3>{price}</h3>
              <button
                onClick={() => removeCartItem(id)}
                className="mt-auto btn   btn-outline-danger"
              >
                Remove
              </button>
            </div>
          </div>

          <div className={cartItemSelection}>
            <span className="d-block mb-1 bg-d">Quantity</span>
            <Form.Select
              onChange={changequantity}
              aria-label="Default select example"
              value={quantity}
            >
              {slectorOptionalNumber}
            </Form.Select>
          </div>
        </div>
      </>
    );
  }
);

export default CartItem;
