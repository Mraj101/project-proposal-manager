import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const UseLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch, setUsr } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/newuser/login",
        { email, password }
      );
      const user = response.data.data;
      if (user) {
        setUsr(user);
      }
      setIsLoading(false);
      return user;
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.error || "Login failed");
      throw error;  // Throw the error to be caught in the component
    }
  };

  return { login, isLoading, error };
};
