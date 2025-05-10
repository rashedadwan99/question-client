import { useEffect, useRef } from "react";
import horror from "../../../assets/audio/horror.mp3";
import { useAudioContext } from "../../../context/AudioContext";
import { useQuestionContext } from "../../../context/QuestionProvider";

const BackgroundAudio = () => {
  const audioRef = useRef(null);
  const { setIsBackgroundAudioPlaying } = useAudioContext();
  const { questionIndex } = useQuestionContext();
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = () => {
      audio.volume = 1;
      audio.loop = true;
      audio
        .play()
        .then(() => setIsBackgroundAudioPlaying(true))
        .catch((err) => {
          console.warn("Audio play blocked. User interaction required.");
        });
    };

    document.addEventListener("click", playAudio, { once: true });

    return () => {
      document.removeEventListener("click", playAudio);
      audio.pause();
      setIsBackgroundAudioPlaying(false);
    };
  }, []);

  return <audio ref={audioRef} src={horror} />;
};

export default BackgroundAudio;
