import { NavLink, useNavigate } from "react-router-dom";
import { Badge, Nav, Navbar, NavDropdown } from "react-bootstrap";
import stayle from "./Header.module.css";
import HeaderBasket from "../../e-Commerce/HeaderBasket/HeaderBasket";
import WishList from "../../e-Commerce/WishList/WishList";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { logOut } from "../../../Redux/auth/authSlice";
import { useEffect } from "react";
import { getWishListItems } from "../../../Redux/wishList/wishListSlice";
const { headerLogo } = stayle;

const Header = () => {
  const navigate = useNavigate();
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };
  useEffect(() => {
    if (accessToken) {
      dispatch(getWishListItems("productIds"));
    }
  },[dispatch,accessToken])
  return (
    <>
      <header className=" ">
        {/* <div className={header_container}>
          <h1 className={headerLogo}>
            <span>Our</span> <Badge bg="info"> Ecom </Badge>
          </h1>
        </div> */}
        <Navbar
          expand="lg"
          className="bg-body-tertiary  position-fixed top-0 end-0 start-0 mb-5 "
          bg="dark"
          data-bs-theme="dark"
        >
          <div className="container-fluid pb-2  ">
            <div className="logo-chart-container d-flex justify-content-center align-items-center  ">
              <Navbar.Brand as={NavLink} to="/" className="  ">
                <h1 className={headerLogo}>
                  <span>Our</span> <Badge bg="info"> Ecom </Badge>
                </h1>
              </Navbar.Brand>
              <HeaderBasket />
              <WishList />
            </div>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="categories">
                  Categories
                </Nav.Link>
                <Nav.Link as={NavLink} to="about-us">
                  About Us
                </Nav.Link>
              </Nav>

              <Nav>
                {!accessToken ? (
                  <div className=" auth d-flex flex-column  align-items-start flex-lg-row align-items-lg-center    ">
                    <Nav.Link as={NavLink} to="login">
                      Login
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="register">
                      Register
                    </Nav.Link>
                  </div>
                ) : (
                  <NavDropdown
                    title={`Welcome ${user?.fristName}`}
                    id="basic-nav-dropdown"
                  >
                    {/* <NavDropdown.Item href="#action/3.1">
                      Profile
                    </NavDropdown.Item> */}
                    <NavDropdown.Item as={ NavLink} to="order" >
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => {handleLogout()}} >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </header>
    </>
  );
};
export default Header;
