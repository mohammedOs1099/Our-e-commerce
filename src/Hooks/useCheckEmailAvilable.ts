import axios from "axios";
import { useState } from "react";
type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";
const useCheckEmailAvilable = () => {
  const [enterEmail, SetEnterEmail] = useState<null | string>(null);
  const [isEmailAvailable, setIsEmailAvailable] = useState<TStatus>("idle");

  const checkEmailAvailability = async (email: string) => {
    SetEnterEmail(email);
    setIsEmailAvailable("checking");
    try {
      const response = await axios.get(
        `https://ecommercserver.onrender.com/users?email=${email}`
      );
      if (!response?.data?.length) {
        setIsEmailAvailable("available");
      } else {
        setIsEmailAvailable("notAvailable");
      }
    } catch (error) {
      setIsEmailAvailable("failed");
    }
  };
  const resetEmailStatus = () => {
    SetEnterEmail(null);
    setIsEmailAvailable("idle");
  };

  return {
    isEmailAvailable,
    enterEmail,
    checkEmailAvailability,
    resetEmailStatus
  };
};

export default useCheckEmailAvilable;
