
import Category from "../Components/e-Commerce/Category/Category";
import Loading from "../Components/feadback/Loading/Loading";
import DisplayList from "../Components/shared/DisplayList/DisplayList";
import useGetCategories from "../Hooks/useGetCategories";
export default function Categories() {
  const { loading, error, records } = useGetCategories();


  return (
    <>
      <div className=" container">
        <Loading loading={loading} error={error}>
          <DisplayList
            Emptymessage="No Categories yet"
            records={records}
            renderItime={(record) => <Category {...record} />}
          />
        </Loading>
      </div>
    </>
  );
}
