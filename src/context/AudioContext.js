import { createContext, useContext, useState, useEffect } from "react";
import { QuestionContext } from "./QuestionProvider";
// Adjust the path to your QuestionContext

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const { questionIndex } = useContext(QuestionContext); // Access questionIndex from context
  const [isBackgroundAudioPlaying, setIsBackgroundAudioPlaying] =
    useState(false);

  useEffect(() => {
    // Automatically mute audio when on first question
    if (questionIndex === 0) {
      setIsBackgroundAudioPlaying(false);
    }
  }, [questionIndex]);

  return (
    <AudioContext.Provider
      value={{ isBackgroundAudioPlaying, setIsBackgroundAudioPlaying }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);
