import { useEffect, useState } from "react";
import Logo from "../../../assets/svg/Cart.svg?react";
import { getCartTotalQuantitySelector } from "../../../Redux/cart/selector/selectors";
import { useAppSelector } from "../../../Redux/hooks";
import stayle from "../HeaderBasket/HeaderBasket.module.css";
import { useNavigate } from "react-router-dom";

const { basketContainer, basketQuantity, logo, cartText, quantityPumping } =
  stayle;
export default function HeaderBasket() {
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!totalQuantity) {
      return
    }
    setIsAnimate(true);
    
    const debounce = setTimeout(() => setIsAnimate(false), 300); // animate after 300ms
    return () => clearTimeout(debounce); // clear timeout on unmount  //
  }, [totalQuantity]);



  return (
    <>
      <div
        onClick={() => navigate("cart")}
        className={`${basketContainer} me-1   d-flex justify-content-center align-items-center `}
      >
        <Logo className={logo} title="basket icon" />
       { totalQuantity? <div
          className={`${basketQuantity} ${
            isAnimate && quantityPumping
          }     `}
        >
          {totalQuantity}
        </div>:null}
        <p className={`${cartText}  position-absolute    `}>cart</p>
      </div>
    </>
  );
}
