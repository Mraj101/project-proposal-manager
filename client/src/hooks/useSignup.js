import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/newuser/crt', {
        email,
        password,
      });

      if (response.status !== 200) {
        setIsLoading(false);
        setError(response.data.error);
      } else {
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({ type: 'LOGIN', payload: response.data });
        // update loading state
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { signup, isLoading, error };
};
