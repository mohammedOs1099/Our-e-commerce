import { Button, Modal, Spinner } from "react-bootstrap";
import { productType } from "../../../Tyepes/productType";
import styles from "./SubtotalPrice.module.css";
import { useState } from "react";
import { useAppDispatch } from "../../../Redux/hooks";

import { clearCartAfterPlaceOrder } from "../../../Redux/cart/cartSlice";
import { thunkPlaceOrders } from "../../../Redux/Orders/ordersSlice";
type TProps = { products: productType[]; accessToken: string | null };
const SubtotalPrice = ({ products, accessToken }: TProps) => { 

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const totalPrice = products.reduce((acc, product) => {
    const price = +product.price;
    const quantity = product.quantity;
    if (quantity && typeof quantity === "number") {
      return acc + price * quantity;
    } else {
      return acc;
    }
  }, 0);

  const modalHandler = () => {
    setShowModal(!showModal);
     setError(null);
  };
  const placeOrderHandler = () => {
     setLoading(true);
    dispatch(thunkPlaceOrders(totalPrice))
   .unwrap()
    .then(() => {
      dispatch(clearCartAfterPlaceOrder());
      setShowModal(false);
    })
    .catch((error) => {
      setError(error);
    })
    .finally(() => setLoading(false));
  };
  return (
    <>
      <Modal
        style={{ zIndex: "999999999999999" }}
        show={showModal}
        onHide={modalHandler}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with Subtotal:{" "}
          {totalPrice.toFixed(2)} EGP ?
          {!loading && error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button
            onClick={placeOrderHandler}
            variant="info"
            style={{ color: "white" }}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{totalPrice} $</span>
      </div>
      {accessToken && (
        <div className={styles.container}>
          <span></span>
          <Button
            variant="info"
            onClick={modalHandler}
            className=" text-white text-center "
          >
            Place order
          </Button>
        </div>
      )}
    </>
  );
};

export default SubtotalPrice;
