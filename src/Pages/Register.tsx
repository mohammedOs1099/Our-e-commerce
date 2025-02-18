import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpTupe, signUpSchema } from "../../Validation/signUpSchema";
import useCheckEmailAvilable from "../Hooks/useCheckEmailAvilable";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";

import { resetUI, thunkRegister } from "../Redux/auth/authSlice";
import { useNavigate,Navigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const {
    loading,
    error: authErorr,
    accessToken
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    reset,
    trigger,
    getFieldState,
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<TSignUpTupe>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur"
  });
  const {
    resetEmailStatus,
    enterEmail,
    checkEmailAvailability,
    isEmailAvailable
  } = useCheckEmailAvilable();
  const onSubmithandler: SubmitHandler<TSignUpTupe> = (data) => {
    const { firstname: fristName, lastname: lastName, email, password } = data;

    if (isEmailAvailable === "available") {
      dispatch(thunkRegister({ email, password, fristName, lastName }))
        .unwrap()
        .then(() => {
          reset();
          resetEmailStatus();
          navigate("/login?message=account_created");
        });
    } else {
      return;
    }
  };
  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");

    const { isDirty, invalid } = getFieldState("email");
    const value = e.target.value;
    if (isDirty && !invalid && enterEmail !== value) {
      checkEmailAvailability(value);
    }
    if (isDirty && invalid && enterEmail) {
      resetEmailStatus();
    }
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
          User Registration
        </h2>
        <Row className=" mb-3">
          <Col md={{ span: 6, offset: 3 }}>
            <Form noValidate onSubmit={handleSubmit(onSubmithandler)}>
              <Form.Group className="mb-3">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  {...register("firstname")}
                  type="text"
                  isInvalid={errors.firstname?.message ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstname?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  {...register("lastname")}
                  type="text"
                  isInvalid={errors.lastname?.message ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastname?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  autoComplete="on"
                  {...register("email")}
                  onBlur={emailOnBlurHandler}
                  type="text"
                  disabled={isEmailAvailable === "checking"}
                  isInvalid={errors.email?.message ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
                {isEmailAvailable === "checking" ? (
                  <Form.Text muted> Email is checking </Form.Text>
                ) : isEmailAvailable === "available" ? (
                  <Form.Text className=" text-success ">
                    Email Is Available
                  </Form.Text>
                ) : isEmailAvailable === "notAvailable" ? (
                  <Form.Text className=" text-danger ">
                    Email Is Not Available{" "}
                  </Form.Text>
                ) : (
                  ""
                )}
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
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  autoComplete="new-password"
                  {...register("confirmpassword")}
                  type="password"
                  isInvalid={errors.confirmpassword?.message ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmpassword?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                disabled={
                  isEmailAvailable === "checking" ||
                  loading === "pending" ||
                  isEmailAvailable === "notAvailable" ||
                  !isValid
                }
                variant="info"
                style={{ color: "white" }}
                type="submit"
              >
                {loading === "pending" ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    <span className="px-1">Loading...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
              {authErorr && (
                <p className="text-danger text-center my-2 ">{authErorr}</p>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
