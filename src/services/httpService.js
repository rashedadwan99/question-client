import axios from "axios";
import { Toast } from "../components/common/toast/Toast";

// Global error interceptor
axios.interceptors.response.use(
  (response) => response, // If successful, just return response
  (error) => {
    const { response } = error;

    // If error has a response from server
    if (response) {
      const { status, data } = response;

      // Show error message based on status
      if (status === 400 && data?.message) {
        Toast("error", data.message);
      } else if (status === 401) {
        Toast("error", "Unauthorized. Please log in again.");
      } else if (status === 403) {
        Toast("error", "Forbidden: You don't have permission.");
      } else if (status === 404) {
        Toast("error", "Not found.");
      } else if (status >= 500) {
        Toast("error", "Server error. Please try again later.");
      } else if (data?.message) {
        Toast("error", data.message);
      } else {
        Toast("error", "An unknown error occurred.");
      }
    } else {
      Toast("error", "Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

// Exporting wrapped HTTP methods
export const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
