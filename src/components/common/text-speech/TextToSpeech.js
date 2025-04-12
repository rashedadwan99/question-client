import { useContext, useEffect, useRef, useState } from "react";
import lipsyncGif from "./lipsync.gif";
import { QuestionContext } from "../../..";

const TextToSpeech = ({ htmlString }) => {
  const { questionIndex } = useContext(QuestionContext);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const prevIndex = useRef(questionIndex);
  const gifRef = useRef(null);

  const speak = (text) => {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      console.warn("Speech Synthesis API is not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1.5;

    utterance.onstart = () => {
      setIsSpeaking(true);
      requestAnimationFrame(() => {
        if (gifRef.current) gifRef.current.style.animationPlayState = "running";
      });
    };

    const stopGif = () => {
      setIsSpeaking(false);
      if (gifRef.current) gifRef.current.style.animationPlayState = "paused";
    };

    utterance.onend = stopGif;
    utterance.onerror = stopGif;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Ensure voices are loaded (fix for some browsers)
    const ensureSpeak = () => {
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.speak(utterance);
        };
      } else {
        window.speechSynthesis.speak(utterance);
      }
    };

    ensureSpeak();
  };

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
    if (plainText.trim()) speak(plainText);
  }, [htmlString, questionIndex]);

  return (
    <div
      style={{
        ...styles.container,
        transform: isSpeaking ? "translateY(0)" : "translateY(150%)",
        width: "initial",
        opacity: isSpeaking ? 1 : 0,
        transition: "all 0.5s ease-out",
        pointerEvents: "none",
      }}
    >
      <img
        ref={gifRef}
        src={lipsyncGif}
        width="300"
        style={{
          ...styles.gif,
          animation: "playGif 1.5s ease-in-out infinite",
          animationPlayState: "paused",
        }}
        alt="Speaking animation"
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
