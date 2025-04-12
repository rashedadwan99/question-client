import { useContext, useEffect, useRef, useState } from "react";
import lipsyncGif from "./lipsync.gif"; // Use GIF instead of video
import { QuestionContext } from "../../..";

const TextToSpeech = ({ htmlString }) => {
  const { questionIndex } = useContext(QuestionContext);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const prevIndex = useRef(questionIndex);
  const gifRef = useRef(null);

  useEffect(() => {
    if (!htmlString) return;

    if (prevIndex.current !== questionIndex) {
      setIsSpeaking(false);
      prevIndex.current = questionIndex;
    }

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    tempDiv
      .querySelectorAll("script, style, noscript, iframe")
      .forEach((el) => el.remove());

    tempDiv.querySelectorAll("*").forEach((el) => {
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") {
        el.remove();
      }
    });

    const plainText = tempDiv.innerText;

    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = "en-US";
    utterance.rate = 1.5;

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (gifRef.current) {
        gifRef.current.style.animationPlayState = "running"; // Start GIF animation
      }
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      if (gifRef.current) {
        gifRef.current.style.animationPlayState = "paused"; // Pause GIF animation
      }
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      if (gifRef.current) {
        gifRef.current.style.animationPlayState = "paused"; // Pause GIF animation on error
      }
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, [htmlString, questionIndex]);

  return (
    <div
      style={{
        ...styles.container,
        transform: isSpeaking ? "translateY(0)" : "translateY(150%)",
        width: "initial",
        opacity: isSpeaking ? 1 : 0,
        transition: "all 0.6s ease-in-out",
        pointerEvents: "none",
      }}
    >
      <img
        ref={gifRef}
        src={lipsyncGif}
        width="300"
        style={{
          ...styles.gif,
          animation: "playGif 1.5s ease-in-out infinite", // Animation for GIF
          animationPlayState: "paused", // Pause by default
        }}
      />
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    right: "-50px",
    bottom: "0",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  gif: {
    display: "block",
    backgroundColor: "transparent",
  },
};

export default TextToSpeech;
