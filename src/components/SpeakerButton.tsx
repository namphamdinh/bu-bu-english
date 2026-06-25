import { useSpeech } from "../hooks/useSpeech";

export const SpeakerButton = ({ text, slow = false }: { text: string; slow?: boolean }) => {
  const { speak, isSupported } = useSpeech();
  return (
    <button
      className="button button--soft"
      onClick={() => speak(text, { rate: slow ? 0.65 : 0.85, lang: "en-US" })}
      disabled={!isSupported}
    >
      {slow ? "🐢 Nghe chậm hơn" : "🔊 Nghe cô đọc"}
    </button>
  );
};
