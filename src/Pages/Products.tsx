import Product from "../Components/e-Commerce/Product/Product";
import Loading from "../Components/feadback/Loading/Loading";
import DisplayList from "../Components/shared/DisplayList/DisplayList";
import useGetProducts from "../Hooks/useGetProducts";

const Products = () => {
  const { loading, error, productFullInfo } = useGetProducts();

  return (
    <>
      <div className=" container">
        <Loading loading={loading} error={error}>
          <DisplayList
            Emptymessage="No Products yet"
            records={productFullInfo}
            renderItime={(record) => <Product {...record} />}
          />
        </Loading>
      </div>
    </>
  );
};
export default Products;
