import { Container } from "react-bootstrap";
import Header from "../../Components/shared/Header/Header";
import Footer from "../../Components/shared/Footer/Footer";
import stayle from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";
const { appContainer, wrapper } = stayle;

export default function MainLayout() {
  return (
    <>
      <Container className={`${appContainer}`}>
        <Header />
              <div className={`${wrapper}  `}>
                  <Outlet/>
        </div>
        <Footer />
      </Container>
    </>
  );
}
