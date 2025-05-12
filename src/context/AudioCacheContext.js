import { createContext, useContext, useEffect, useRef, useState } from "react";

export const AudioCacheContext = createContext();

export const AudioCacheProvider = ({ children, questions }) => {
  const [audioMap, setAudioMap] = useState({});
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (isLoadedRef.current || !questions?.length) return;

    const loadAudio = async () => {
      const map = {};

      for (let i = 0; i < questions.length; i++) {
        const htmlString = questions[i]?.html;
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
        if (!plainText) continue;

        try {
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

          if (!response.ok) continue;

          const blob = await response.blob();
          const audioURL = URL.createObjectURL(blob);
          map[i] = audioURL;
        } catch (err) {
          console.error(`فشل تحميل صوت السؤال ${i}:`, err);
        }
      }

      setAudioMap(map);
      isLoadedRef.current = true;
    };

    loadAudio();
  }, [questions]);

  return (
    <AudioCacheContext.Provider value={audioMap}>
      {children}
    </AudioCacheContext.Provider>
  );
};

export const useAudioCache = () => useContext(AudioCacheContext);
