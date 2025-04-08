import { http } from "./httpService";
const apiEndPoint = process.env.REACT_APP_BASE_URL + "/questions";
export const getAllQuestions = () => {
  return http.get(apiEndPoint);
};
