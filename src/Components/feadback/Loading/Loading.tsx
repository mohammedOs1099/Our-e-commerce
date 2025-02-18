import { Spinner } from "react-bootstrap";
import { loadingType } from "../../../Tyepes/sharedTypes";
import LottieHandler from "../LottieHandler/LottieHandler";

type TLoadingProps = {
  loading: loadingType;
  error: null | string;
  children: React.ReactNode;
};

const Loading = ({ loading, error, children }: TLoadingProps) => {
  if (loading === "pending") {
    return (
      <>
        <div className=" container d-flex justify-content-center my-3 align-items-center flex-column ">
          <div className="spinner_container">
            <Spinner animation="grow" size="sm" variant="info" />
            <Spinner animation="grow" variant="info" />
          </div>
          <p className="text-info text-center "> Loading please wait... </p>
        </div>
      </>
    );
  }
  if (loading === "failed") {
    
    
    return <LottieHandler type="error" message={error as string }  />;
  }
  return <>{children}</>;
};

export default Loading;
