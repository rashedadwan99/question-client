import { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { QuestionProvider } from "./context/QuestionProvider";
const QuestionContext = createContext();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <QuestionProvider>
      <App />
    </QuestionProvider>
  </Router>
);
export { QuestionContext };
