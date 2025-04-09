import { http } from "./httpService";
const apiQuestionEndPoint = process.env.REACT_APP_BASE_URL + "/questions";
const apiAnswersEndPoint = process.env.REACT_APP_BASE_URL + "/userAnswers";
export const getAllQuestions = () => {
  return http.get(apiQuestionEndPoint);
};
export const sendAllAnswers = (data) => {
  return http.post(apiAnswersEndPoint + "/submit", data);
};
export const checkIfUserSubmit = (universityNumber) => {
  return http.get(apiAnswersEndPoint + `/check`, {
    params: universityNumber,
  });
};
