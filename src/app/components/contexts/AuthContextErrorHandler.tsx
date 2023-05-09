import React, { ReactNode, createContext, useState } from "react";

interface AuthContextProps{
    children: ReactNode;
}

interface AuthContextValue {
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  clearError: () => void;
}

export const AuthContextErrorHandler = createContext<AuthContextValue>({
  errors: [],
  setErrors: () => {},
  clearError: () => {}
});

export const AuthProvider = ({ children } : AuthContextProps) => {
  const [errors, setErrors] = useState<string[]>([]);

  const clearError = () => {
    setErrors([]);
  }

  return (
    <AuthContextErrorHandler.Provider value={{ errors, setErrors, clearError}}>
      {children}
    </AuthContextErrorHandler.Provider>
  );
};
