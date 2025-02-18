import { Link } from "react-router-dom";
import styles from "./Category.module.css";
import { catigoryType } from "../../../Tyepes/categoryType";
const { category_card, category_img, category_img_container } = styles;

const Category = ({ title, img, prefix }: catigoryType) => {
  return (
    <>
      <Link
        className={`${category_card} text-decoration-none m-1 p-3 d-flex justify-content-center align-items-center flex-column`}
        to={`/categories/products/${prefix}`}
      >
        <div className={`${category_img_container} mb-1 rounded-circle`}>
          <img className={`${category_img} `} src={img} alt=" category-img " />
        </div>
        <h1 title={title} className="category-title mb-1 text-center ">
          {title}
        </h1>
      </Link>
    </>
  );
};

export default Category;
//  src =
//    "https://cdn-eu.dynamicyield.com/api/9876644/images/244c68ad42d8b__hp-w12-22032022-h_m-women_shirts-blouses.jpg";
