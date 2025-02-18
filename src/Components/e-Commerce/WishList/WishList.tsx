import { useEffect, useState } from "react";
import Logo from "../../../assets/svg/wishlist.svg?react";

import { useAppSelector } from "../../../Redux/hooks";
import stayle from "./WishList.module.css";
import { useNavigate } from "react-router-dom";

const {
  WishListContainer,
  WishListQuantity,
  logo,

  quantityPumping
} = stayle;
export default function WishList() {
  const totalQuantity = useAppSelector((state) => state.wishList.productsId);
  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);

    const debounce = setTimeout(() => setIsAnimate(false), 300); // animate after 300ms
    return () => clearTimeout(debounce); // clear timeout on unmount  //
  }, [totalQuantity]);

  return (
    <>
      <div
        onClick={() => navigate("wishlist")}
        className={`${WishListContainer} me-1  d-flex justify-content-center align-items-center `}
      >
        <Logo className={logo} title="basket icon" />

        {totalQuantity ? (
          <div
            className={`${WishListQuantity} ${
              isAnimate && quantityPumping
            }    `}
          >
            {totalQuantity.length}
          </div>
        ) : null}
      </div>
    </>
  );
}
