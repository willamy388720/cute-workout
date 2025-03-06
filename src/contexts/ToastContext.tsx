import { Toast } from "@components/shared/Toast";
import { createContext, ReactNode, useState } from "react";

type ToastCustomContextType = {
  openToast: ({ isOpen, title, content, error }: OpenToastProps) => void;
};

export const ToastCustomContext = createContext({} as ToastCustomContextType);

type ToastCustomProviderProps = {
  children: ReactNode;
};

type OpenToastProps = {
  isOpen: boolean;
  title: string;
  content: string;
  error: boolean;
};

export function ToastCustomProvider({ children }: ToastCustomProviderProps) {
  const [isOpenToast, setIsOpenToast] = useState(false);
  const [titleToast, setTitleToast] = useState("");
  const [contentToast, setContentToast] = useState("");
  const [errorToast, setErrorToast] = useState(false);

  function openToast({ isOpen, title, content, error }: OpenToastProps) {
    setIsOpenToast(isOpen);
    setTitleToast(title);
    setContentToast(content);
    setErrorToast(error);
  }

  return (
    <ToastCustomContext.Provider value={{ openToast }}>
      <Toast
        title={titleToast}
        content={contentToast}
        error={errorToast}
        open={isOpenToast}
        onClose={() => setIsOpenToast(false)}
      />
      {children}
    </ToastCustomContext.Provider>
  );
}
