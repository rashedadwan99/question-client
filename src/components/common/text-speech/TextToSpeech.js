import { useContext, useEffect, useRef, useState } from "react";
import { QuestionContext } from "../../../context/QuestionProvider";

const TextToSpeech = ({ htmlString, src }) => {
  const { questionIndex } = useContext(QuestionContext);
  const isMuted = questionIndex === 0;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const prevIndex = useRef(null);
  const gifRef = useRef(null);
  const voiceRef = useRef(null);

  // جلب أفضل صوت رجل خشن (أو صوت أكثر عمقًا)
  const loadVoice = () => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    // حاول العثور على صوت أكثر خشونة (نبحث عن كلمات مثل "George" أو أصوات معينة تكون خشنة)
    const roughMaleVoice =
      voices.find(
        (v) =>
          v.name.toLowerCase().includes("george") && v.lang.startsWith("en")
      ) ||
      voices.find(
        (v) =>
          v.name.toLowerCase().includes("english") && v.lang.startsWith("en")
      ) ||
      voices.find(
        (v) => v.name.toLowerCase().includes("male") && v.lang.startsWith("en")
      ) ||
      voices.find((v) => v.lang === "en-US"); // اختيار الصوت الأنسب حسب المتاح

    if (roughMaleVoice) {
      voiceRef.current = roughMaleVoice;
    } else {
      console.warn("لم يتم العثور على صوت رجل خشن مناسب.");
    }
  };

  useEffect(() => {
    if (!window.speechSynthesis) return;

    // بعض المتصفحات تحتاج إلى انتظار الأصوات
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = loadVoice;
    } else {
      loadVoice();
    }
  }, []);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (!synth || !voiceRef.current) return;

    synth.cancel(); // إلغاء أي كلام حالي قبل البدء

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voiceRef.current;
    utterance.lang = voiceRef.current.lang || "en-US";

    // عندما يبدأ الكلام
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsActive(true);
      if (gifRef.current) gifRef.current.style.animationPlayState = "running";
    };

    // عندما ينتهي الكلام
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsActive(false);
      if (gifRef.current) gifRef.current.style.animationPlayState = "paused";
    };

    synth.speak(utterance);
  };

  useEffect(() => {
    if (!htmlString || isMuted || !voiceRef.current) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    // إزالة بعض العناصر غير المرغوب فيها مثل iframe و script
    tempDiv
      .querySelectorAll("script, style, noscript, iframe")
      .forEach((el) => el.remove());

    // إزالة العناصر المخفية
    tempDiv.querySelectorAll("*").forEach((el) => {
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") {
        el.remove();
      }
    });

    const plainText = tempDiv.innerText.trim();

    if (plainText && questionIndex !== prevIndex.current) {
      speak(plainText); // التحدث بالنص
      prevIndex.current = questionIndex;
    }

    return () => {
      window.speechSynthesis.cancel(); // إلغاء أي كلام مستمر
      setIsSpeaking(false);
      setIsActive(false);
    };
  }, [htmlString, questionIndex, isMuted]);

  // عدم عرض المكون إذا كانت الإجابة هي 0 (فيما يتعلق بالصوت)
  if (questionIndex === 0) return null;

  return (
    <div
      style={{
        ...styles.container,
        transform: isActive ? "translateY(0)" : "translateY(150%)",
        opacity: isActive ? 1 : 0,
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
          animationPlayState: isSpeaking ? "running" : "paused",
        }}
        alt="Speaking animation"
      />
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    right: "0",
    bottom: "0",
    zIndex: 1000,
    display: "flex",
    justifyContent: "end",
    backgroundColor: "transparent",
  },
  gif: {
    display: "block",
    backgroundColor: "transparent",
  },
};

export default TextToSpeech;
