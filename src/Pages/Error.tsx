import { Container } from "react-bootstrap";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import LottieHandler from "../Components/feadback/LottieHandler/LottieHandler";


export default function Error() {
  // const error = useRouteError();
  // let errorStatus: number;
  // let errorstatusText: string;
  // let errorDetails: string | undefined;
  // if (isRouteErrorResponse(error)) {
  //   errorStatus = error?.status;
  //   errorstatusText = error.statusText;
  //   errorDetails = error?.data?.message;
  // } else {
  //   errorStatus = 404;
  //   errorstatusText = "Page Not Found";
  // }

  return (
    <>
      <Container className="notFound my-2">
        {/* <h2 className="text-danger"> {errorStatus}</h2>
        <p className="text-danger">{errorstatusText}</p>
        {errorDetails && (
          <p className="text-danger"> details:{errorDetails} </p>
        )} */}
        <LottieHandler type="NotFound" />

        <Link to="/" className=" text-info" replace={true}>
          How about going back to safety?
        </Link>
      </Container>
    </>
  );
}
