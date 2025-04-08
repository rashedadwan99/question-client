import { toast } from "react-toastify";

export const Toast = (status, message, autoClose = 2000, onClick) => {
  return toast[status](message, {
    position: "top-right",
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    onClick,
  });
};
