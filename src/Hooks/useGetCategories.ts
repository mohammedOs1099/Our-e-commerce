import { useEffect } from "react";

import { thunkGetCategories } from "../Redux/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
const useGetCategories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
  
    if (!records.length) {
     dispatch(thunkGetCategories());
    }
    return () => {};
  }, [dispatch, records]);
  return { loading, error, records };
};

export default useGetCategories;
