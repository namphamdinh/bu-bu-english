import type { Word } from "../types/word";
import { SpeakerButton } from "./SpeakerButton";

export const MiniStoryCard = ({ words }: { words: Word[] }) => {
  const selected = words.slice(0, 3);
  const story = selected.map((w) => w.example).join(" ");
  const meaning = selected.map((w) => w.exampleMeaning).join(" ");
  return <article className="story-card"><h3>📖 Chuyện nhỏ của Bư Bư</h3><p><strong>{story}</strong></p><p>{meaning}</p><SpeakerButton text={story} /></article>;
};
