import { Button, Container, Modal, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { useEffect, useState } from "react";
import {
  resetOrderState,
  thunkGetUserAuthOrder
} from "../Redux/Orders/ordersSlice";
import Loading from "./../Components/feadback/Loading/Loading";
import { productType } from "../Tyepes/productType";
import LottieHandler from "../Components/feadback/LottieHandler/LottieHandler";

const Order = () => {
  const { error, loading, orderList } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  const [orderItems, setOrderItems] = useState<productType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setOrderItems([]);
  };
  const showOlderDetails = (id: number) => {
    const selsctedOrder = orderList.find((order) => order.id === id);
    const orderInDetails = selsctedOrder?.items ?? [];
    
    setShowModal(true);
    setOrderItems((prev) => [...prev, ...orderInDetails]);
  };
  useEffect(() => {
    const promise = dispatch(thunkGetUserAuthOrder());
    return () => {
      promise.abort();
      dispatch(resetOrderState());
    };
  }, [dispatch]);
  return (
    <>
      <Modal
        style={{ zIndex: "999999999999" }}
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" container">
            <Loading loading={loading} error={error}>
              <div className="row flex-column  ">
                {orderItems.map((order) => (
                  <div
                    key={order.id}
                    className="col my-1 text-center border-bottom border-info   py-3  "
                  >
                    <img
                      src={order.img}
                      alt={order.title}
                      className=" w-25 h-25 rounded-2 my-2  "
                    />
                    <div className="p-3  bg-light border rounded">
                      <h6 className="mb-0">Product Name: {order.title}</h6>
                      <p className="mb-0">Price: ${order?.price}</p>
                      <p className="mb-0">Quantity: {order.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Loading>
          </div>
        </Modal.Body>
      </Modal>
      <h3 className=" my-3 mb-4   fw-bold   ">
        My <span className="  text-white p-1 bg-info rounded-1 ">Orders</span>
      </h3>
      <Container>
        <Loading error={error} loading={loading}>
          {orderList.length > 0 ? (
            <Table
              responsive="md"
              className="my-2 m-auto  text-center text-nowrap"
            >
              <thead className="">
                <tr>
                  <th>Order Number</th>
                  <th>Items</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody className="">
                {orderList.map((order, index) => (
                  <tr key={order.id}>
                    <td className="">{index + 1}</td>
                    <td>
                      {order.items.length} {"item(s)"}
                      {" / "}{" "}
                      <span
                        onClick={() => {
                          showOlderDetails(order.id);
                        }}
                        className="text-info"
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline"
                        }}
                      >
                        Product Details
                      </span>
                    </td>
                    <td>{order.subTotalPraice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className=" d-flex justify-content-center align-items-center 0   ">
              <LottieHandler message={"No orders yet!"} type={"empty"} />
            </div>
          )}
        </Loading>
      </Container>
    </>
  );
};

export default Order;
