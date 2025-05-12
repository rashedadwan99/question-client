import { useContext, useEffect, useRef, useState } from "react";
import { QuestionContext } from "../../../context/QuestionProvider";

const TextToSpeech = ({ htmlString, src }) => {
  const { questionIndex } = useContext(QuestionContext);
  const isMuted = questionIndex === 0;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isActive, setIsActive] = useState(false); // يتحكم بظهور الشخصية
  const prevIndex = useRef(null);
  const gifRef = useRef(null);
  const audioRef = useRef(null); // لحفظ الصوت الحالي

  useEffect(() => {
    if (!htmlString || isMuted) return;

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

    const plainText = tempDiv.innerText.trim();

    if (plainText) {
      const fetchAudioFromElevenLabs = async () => {
        try {
          // أوقف الصوت السابق فوراً إذا تغيّر السؤال
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
            audioRef.current = null;
          }
          setIsSpeaking(false);
          setIsActive(false);

          const response = await fetch(
            "https://api.elevenlabs.io/v1/text-to-speech/N2lVS1w4EtoT3dr4eOWO",
            {
              method: "POST",
              headers: {
                "xi-api-key":
                  "sk_45751261eae91d927159aa6461b965625d155c25b7e023f0",
                "Content-Type": "application/json",
                Accept: "audio/mpeg",
              },
              body: JSON.stringify({
                text: plainText,
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                  stability: 0.4,
                  similarity_boost: 0.8,
                },
              }),
            }
          );

          if (!response.ok) throw new Error("فشل في تحميل الصوت");

          const blob = await response.blob();
          const audioURL = URL.createObjectURL(blob);
          const audio = new Audio(audioURL);
          audioRef.current = audio;

          // ✅ عند بدء التشغيل
          audio.play();
          setIsSpeaking(true);
          setIsActive(true); // ✅ عرض الشخصية عند بدء الصوت

          if (gifRef.current)
            gifRef.current.style.animationPlayState = "running";

          audio.onended = () => {
            setIsSpeaking(false);
            setIsActive(false); // ✅ إخفاء الشخصية بعد انتهاء الصوت
            if (gifRef.current)
              gifRef.current.style.animationPlayState = "paused";
          };
        } catch (error) {
          console.error("خطأ في تشغيل الصوت:", error);
          setIsActive(false); // في حال الخطأ خفِ الشخصية
        }
      };

      fetchAudioFromElevenLabs();
      prevIndex.current = questionIndex;
    }

    // Cleanup on question change
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      setIsSpeaking(false);
      setIsActive(false);
    };
  }, [htmlString, questionIndex, isMuted]);

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
