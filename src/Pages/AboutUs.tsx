
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaShippingFast, FaLock, FaHeadset } from "react-icons/fa";

const AboutUs = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">About Our E-Commerce Store</h2>
      <p className="text-center text-muted">
        We are committed to providing the best online shopping experience with a
        wide range of products, secure payment options, and fast delivery.
      </p>
      <Row className="mt-5">
        <Col md={4} className="mb-4">
          <Card className="text-center p-3 shadow">
            <FaShippingFast size={50} className="text-primary mx-auto my-3" />
            <Card.Body>
              <Card.Title>Fast & Free Shipping</Card.Title>
              <Card.Text>Enjoy fast and free shipping on all orders.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center p-3 shadow">
            <FaLock size={50} className="text-success mx-auto my-3" />
            <Card.Body>
              <Card.Title>Secure Payments</Card.Title>
              <Card.Text>
                We provide 100% secure and trusted payment methods.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center p-3 shadow">
            <FaHeadset size={50} className="text-danger mx-auto my-3" />
            <Card.Body>
              <Card.Title>24/7 Customer Support</Card.Title>
              <Card.Text>
                Our support team is available round the clock.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
