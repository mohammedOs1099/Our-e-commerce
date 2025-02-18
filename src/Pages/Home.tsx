import { Carousel } from "react-bootstrap";
import Category from "../Components/e-Commerce/Category/Category";
import Product from "../Components/e-Commerce/Product/Product";
import Loading from "../Components/feadback/Loading/Loading";
import DisplayList from "../Components/shared/DisplayList/DisplayList";
import useGetCategories from "../Hooks/useGetCategories";
import useGetProducts from "../Hooks/useGetProducts";

export default function Home() {
  const { loading, error, productFullInfo } = useGetProducts();
  const {
    loading: loadingCategories,
    error: errorCategories,
    records
  } = useGetCategories();

  return (
    <>
          <div className=" container ">
              
        <Loading
          loading={ loadingCategories}
          error={errorCategories || error}
        >
          <Carousel className=" text-info d-flex justify-content-center align-items-center  ">
            {records.length > 0 &&
              records.map((record) => (
                <Carousel.Item as={"div"} className=" p-5  " key={record.id}>
                  <div className="  d-flex h-50 text-light justify-content-center align-items-center ">
                    <Category {...record} />
                  </div>
                </Carousel.Item>
              ))}
          </Carousel>

          {/* <DisplayList
            Emptymessage="No Categories yet"
            records={records}
            renderItime={(record) => <Category {...record} />}
          /> */}
          <DisplayList
            Emptymessage="No Products yet"
            records={productFullInfo}
            renderItime={(record) => <Product key={record.id} {...record} />}
          />
        </Loading>
      </div>
    </>
  );
}
