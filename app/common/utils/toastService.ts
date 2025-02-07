// src/utils/ToastService.ts

import { toast } from "react-toastify";

const ToastService = {
  success: (message: string, duration: number = 3000) =>
    toast.success(message, { autoClose: duration }),
  error: (message: string, duration: number = 3000) =>
    toast.error(message, { autoClose: duration }),
  info: (message: string, duration: number = 3000) =>
    toast.info(message, { autoClose: duration }),
  warning: (message: string, duration: number = 3000) =>
    toast.warn(message, { autoClose: duration }),
};

export default ToastService;
