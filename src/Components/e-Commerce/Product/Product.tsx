import { memo, useEffect, useState } from "react";
import { addToCart } from "../../../Redux/cart/cartSlice";
import { useAppDispatch } from "../../../Redux/hooks";
import { productType } from "../../../Tyepes/productType";
import stayle from "./Product.module.css";
import { Modal, Spinner } from "react-bootstrap";
import DisLike from "../../../assets/svg/like.svg?react";
import Like from "../../../assets/svg/like-fill.svg?react";
import { wishListAction } from "../../../Redux/wishList/wishListSlice";
const { product_img_container, product_card, like_btn_container } =
  stayle;
const Product = memo(
  ({ title, price, img, id, max, quantity, isLiked, isAuth }: productType) => {
    const [btnDis, setBtnDis] = useState(false);
    const dispatch = useAppDispatch();
    const currentyQuantity = (max ?? 0) - (quantity ?? 0);
    const reachedToMax = currentyQuantity === 0 ? true : false;
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
      if (!btnDis) {
        return;
      }
      const debounce = setTimeout(() => setBtnDis(false), 300);
      return () => clearTimeout(debounce);
    }, [btnDis]);
    const addToCartHandelar = () => {
      dispatch(addToCart(id));
      setBtnDis(true);
    };

    const likeToggelHandelar = () => {
      if (!isAuth) {
        setShowModal(true);
        return;
      } else {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(wishListAction(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      }
    };
    return (
      <>
        <Modal
          style={{ zIndex: "999999999999999" }}
          className="   "
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>

        <div
          className={`${product_card} d-flex justify-content-center align-items-center flex-column p-2  `}
        >
          <div
            className={` ${product_img_container} rounded-2 position-relative `}
          >
            <div
              className={`${like_btn_container} position-absolute`}
              onClick={likeToggelHandelar}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" variant="info" />
              ) : isLiked ? (
                <Like />
              ) : (
                <DisLike />
              )}
            </div>
            <img src={img} alt={title} className={` product_img   `} />
          </div>
          <h5 className="p-2" title={title}>
            {title}
          </h5>
          <p className="  h4  "> {price}$</p>
          <p className="    ">
            {reachedToMax
              ? "  you reached to the limit"
              : `Number of itmes: ${currentyQuantity} `}
          </p>
          <button
            className="btn btn-outline-info w-100  "
            onClick={addToCartHandelar}
            disabled={btnDis || reachedToMax}
          >
            {btnDis ? (
              <>
                <Spinner animation="border" size="sm" /> loading...
              </>
            ) : (
              "Add To Cart"
            )}
          </button>
        </div>
      </>
    );
  }
);

export default Product;
