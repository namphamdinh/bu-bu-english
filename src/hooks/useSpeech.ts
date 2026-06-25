import { useCallback, useEffect, useState } from "react";

export const useSpeech = () => {
  const [isSupported] = useState(() =>
    typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!isSupported) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (isSupported) window.speechSynthesis.cancel();
  }, [isSupported]);

  const speak = useCallback((
    text: string,
    options: { rate?: number; lang?: string } = {}
  ) => {
    if (!isSupported || !text.trim()) return false;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang ?? "en-US";
    utterance.rate = options.rate ?? 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.voice = voices.find((voice) => voice.lang.toLowerCase().replace("_", "-") === "en-us")
      ?? voices.find((voice) => voice.lang.toLowerCase().replace("_", "-") === "en-gb")
      ?? voices.find((voice) => voice.lang.toLowerCase().startsWith("en"))
      ?? null;
    window.speechSynthesis.speak(utterance);
    return true;
  }, [isSupported, voices]);

  useEffect(() => stop, [stop]);

  return { isSupported, voices, speak, stop };
};
