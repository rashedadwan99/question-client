import { useEffect, useRef } from "react";
import horror from "../../../assets/audio/horror.mp3";
import { useAudioContext } from "../../../context/AudioContext";

const BackgroundAudio = () => {
  const audioRef = useRef(null);
  const { setIsBackgroundAudioPlaying } = useAudioContext();

  useEffect(() => {
    // ✅ أنشئ كائن الصوت
    const audio = new Audio(horror);
    audio.loop = true;
    audio.volume = 1;
    audioRef.current = audio;

    // ✅ محاولة التشغيل عند أول تفاعل من المستخدم
    const playAudio = () => {
      audio
        .play()
        .then(() => {
          setIsBackgroundAudioPlaying(true);
        })
        .catch((err) => {
          console.warn("Background audio play was blocked:", err);
        });
    };

    document.addEventListener("click", playAudio, { once: true });

    return () => {
      document.removeEventListener("click", playAudio);
      audio.pause();
      audioRef.current = null;
      setIsBackgroundAudioPlaying(false);
    };
  }, []);

  return null; // ✅ لا حاجة لعنصر <audio /> في JSX
};

export default BackgroundAudio;
