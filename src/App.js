import { Container } from "react-bootstrap";
import MainRoutes from "./routes/MainRoutes";
import { ToastContainer } from "react-toastify";
import LoadingScreen from "./components/common/loadingScreen/LoadingScreen";
import BackgroundAudio from "./components/common/bgAudion/BackgroundAudio";
import "./app.css";
import { useQuestionContext } from "./context/QuestionProvider";
import { AudioProvider } from "./context/AudioContext";

const AppContent = () => {
  const { isLoading } = useQuestionContext();

  return !isLoading ? (
    <Container fluid className="app-container">
      <BackgroundAudio />
      <ToastContainer />
      <MainRoutes />
    </Container>
  ) : (
    <LoadingScreen />
  );
};

function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}

export default App;
