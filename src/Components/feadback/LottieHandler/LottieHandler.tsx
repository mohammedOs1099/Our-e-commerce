import Lottie from "lottie-react";
import NotFound from "../../../assets/lottieFiles/NotFound.json";
import empty from "../../../assets/lottieFiles/empty.json";
import error from "../../../assets/lottieFiles/error.json";
import loading from "../../../assets/lottieFiles/loading.json";
import sccess from "../../../assets/lottieFiles/sccess.json";
const LottiesFilesMap = {
  NotFound,
  empty,
  error,
  loading,
  sccess,
};
type TLottiesProps = {
  type: keyof typeof LottiesFilesMap;
  message?: string;
};

const LottieHandler = ({ type, message }: TLottiesProps) => {
    const LottieFile = LottiesFilesMap[type];   
  return (
    <>
      <div className=" col-8  col-md-3  mx-auto  text-center  ">
        <Lottie animationData={LottieFile} loop={true} />
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default LottieHandler;
