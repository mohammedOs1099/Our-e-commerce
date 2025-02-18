import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import AboutUs from "../Pages/AboutUs";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Categories from "../Pages/Categories";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Error from "../Pages/Error";
import Cart from "../Pages/Cart";
import WishList from "../Pages/WishList";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import Order from "../Pages/Order";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route errorElement={<Error />}>
          <Route path="about-us" element={<AboutUs />} />
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route
            path="categories/products/:prefix"
            loader={({ params }) => {
              if (
                typeof params.prefix !== "string" ||
                !/^[a-z]+$/i.test(params.prefix)
              ) {
                throw new Response("bad request", {
                  statusText: "Category not found",
                  status: 400
                });
              }
              return true;
            }}
            element={<Products />}
          />
          <Route path="cart" element={<Cart />} />
          <Route
            path="wishlist"
            element={
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            }
          />
          <Route
            path="order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />

          <Route path="categories" element={<Categories />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Route>
    </>
  )
);
export default routes;
