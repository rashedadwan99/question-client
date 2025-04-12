import { useEffect } from "react";

const TextToSpeech = ({ htmlString }) => {
  useEffect(() => {
    if (!htmlString) return;

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
    utterance.rate = 1; // 🔥 Faster speech (adjust as needed)
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, [htmlString]);

  return null;
};

export default TextToSpeech;
