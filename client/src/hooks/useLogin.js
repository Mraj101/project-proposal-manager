import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const UseLogin = () => {
  console.log("hi");
  // console.log("hllo");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("hi");

  const { dispatch, setUsr } = useAuthContext();

  console.log("before login");

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/newuser/login",
        { email, password },
      );
      const user = response.data.data;
      if (user) {
        setUsr(user);
      }
      setIsLoading(false);
      return user;
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };

  return { login, isLoading, error };
};
