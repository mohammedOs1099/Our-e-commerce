import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row, Alert } from "react-bootstrap";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, TSignInInputs } from "../../Validation/signInSchema";
import { useNavigate, useSearchParams,Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { resetUI, thunkLogin } from "../Redux/auth/authSlice";
import { useEffect } from "react";
const Login = () => {
  const { loading, error: loginErorr,accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<TSignInInputs>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur"
  });
  const onSubmitHandler: SubmitHandler<TSignInInputs> = (data) => {
  
    dispatch(thunkLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
        reset();
       if (searchParams.get("message")) {
        setSearchParams("");
      }
      });
      
  };

  useEffect(() => {
    return () => {
       dispatch(resetUI());
    };
  }, [dispatch]);
  if (accessToken) {
     return <Navigate to={"/"} />;
    
  }
  return (
    <>
      <Container>
        <h2 className=" text-info m-3 text-center text-decoration-underline ">
          User Login
        </h2>
        <Row className=" mb-3">
          <Col md={{ span: 6, offset: 3 }}>
            {searchParams.get("message") === "login_is_required" && (
              <Alert variant="success">
               You neede to login frist!
              </Alert>
            )}
            {searchParams.get("message") === "account_created" && (
              <Alert variant="success">
                Your account successfully created, please login
              </Alert>
            )}
            <Form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  isInvalid={errors.email?.message ? true : false}
                  {...register("email")}
                  type="text"
                  autoComplete="on"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  autoComplete="new-password"
                  {...register("password")}
                  type="password"
                  isInvalid={errors.password?.message ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                disabled={loading === "pending" || !isValid}
                variant="info"
                style={{ color: "white" }}
                type="submit"
              >
                Submit
              </Button>
              {loginErorr && (
                <p className="text-danger text-center my-2 ">{loginErorr}</p>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
