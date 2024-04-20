import { createContext, useReducer, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const [usr, setUsr] = useState(null)

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, usr, setUsr }}>
      {children}
    </AuthContext.Provider>
  );
};