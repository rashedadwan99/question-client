import { useContext, useEffect, useRef, useState } from "react";
import { useAudioContext } from "../../../context/AudioContext";
import { QuestionContext } from "../../../context/QuestionProvider";

const TextToSpeech = ({ htmlString, src }) => {
  const { questionIndex } = useContext(QuestionContext);
  const { isBackgroundAudioPlaying } = useAudioContext();

  const isMuted = questionIndex === 0;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const prevIndex = useRef(null);
  const gifRef = useRef(null);

  useEffect(() => {
    const handleVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
      }
    };

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      handleVoicesChanged();
    }
  }, []);

  const speak = (text) => {
    // if (
    //   (isBackgroundAudioPlaying && questionIndex !== 0) ||
    //   questionIndex === 0 // 🔐 block if question index is 0
    // )
    //   return;

    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (gifRef.current) gifRef.current.style.animationPlayState = "running";
    };

    const stopGif = () => {
      setIsSpeaking(false);
      if (gifRef.current) gifRef.current.style.animationPlayState = "paused";
    };

    utterance.onend = stopGif;
    utterance.onerror = stopGif;

    window.speechSynthesis.cancel();
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  };

  useEffect(() => {
    if (!htmlString || !voicesLoaded) return;

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
    if (plainText.trim()) {
      setIsSpeaking(false);
      speak(plainText);
      prevIndex.current = questionIndex;
    }
  }, [htmlString, questionIndex, voicesLoaded, isMuted]);

  if (questionIndex === 0) return null;

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
        src={src}
        width="200"
        height="200"
        style={{
          ...styles.gif,
          animation: "playGif 2s ease-in-out infinite",
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
