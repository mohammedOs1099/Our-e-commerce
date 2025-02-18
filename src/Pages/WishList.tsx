import Product from "../Components/e-Commerce/Product/Product";
import Loading from "../Components/feadback/Loading/Loading";
import DisplayList from "../Components/shared/DisplayList/DisplayList";
import useWishlist from "../Hooks/useWishlist";

const WishList = () => {
  const { error, records, loading } = useWishlist();

  return (
    <>
      <div className=" container">
        <Loading loading={loading} error={error}>
          <DisplayList
            records={records}
            renderItime={(record) => <Product {...record} />}
            Emptymessage=" Wishlist is Empty! "
          />
        </Loading>
      </div>
    </>
  );
};

export default WishList;
