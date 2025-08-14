//ErrorContext is meant to be wrapped around the main App.tsx
import { createContext, useContext, useState } from "react";

type ErrorContextType = {
  error: string;
  setError: (msg: string) => void;
  clearError: () => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setErrorMsg] = useState("");

  const clearError = () => setErrorMsg("");
  const setError = (msg: string) => {
    setErrorMsg(msg);
    //Clear the error message after 10s
    setTimeout(clearError, 10000);
  };

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const ctx = useContext(ErrorContext);
  if (!ctx) throw new Error("useError must be used inside ErrorProvider");
  return ctx;
};
