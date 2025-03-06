import { useContext } from "react";

import { ToastCustomContext } from "@contexts/ToastContext";

export function useToast() {
  const context = useContext(ToastCustomContext);

  return context;
}
