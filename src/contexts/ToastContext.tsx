import { createContext, useState, ReactNode, ElementType } from "react";
import { Toast } from "@components/ui/Toast";

type ToastContextData = {
  showToast: (options: ToastOptions) => void;
};

type ToastProviderProps = {
  children: ReactNode;
};

type ToastOptions = {
  icon: ElementType;
  variant: "default" | "dark" | "success" | "info" | "warning" | "danger";
  title: string;
  description?: string;
};

export const ToastContext = createContext<ToastContextData | undefined>(
  undefined
);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastOptions, setToastOptions] = useState<ToastOptions | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  function showToast(options: ToastOptions) {
    setToastOptions(options);
    setIsOpen(true);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toastOptions && (
        <Toast
          icon={toastOptions.icon}
          variant={toastOptions.variant}
          title={toastOptions.title}
          description={toastOptions.description}
          isOpen={isOpen}
          closeToast={() => setIsOpen(false)}
        />
      )}
    </ToastContext.Provider>
  );
};
