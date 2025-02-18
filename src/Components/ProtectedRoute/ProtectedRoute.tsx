import { ReactNode } from "react";
import { useAppSelector } from "../../Redux/hooks";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children:ReactNode }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  if (!accessToken) {
    return <Navigate to={"/login?message=login_is_required"} />;
  }
  return children;
};

export default ProtectedRoute;