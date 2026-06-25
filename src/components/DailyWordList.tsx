import type { Word } from "../types/word";

export const DailyWordList = ({ words, current }: { words: Word[]; current: number }) => (
  <div className="word-dots" aria-label="Danh sách từ hôm nay">
    {words.map((word, index) => <span key={word.id} className={index < current ? "done" : index === current ? "current" : ""}>{word.emoji}</span>)}
  </div>
);
