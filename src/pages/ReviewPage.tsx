import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { WordCard } from "../components/WordCard";
import { words } from "../data/words";
import { useProgress } from "../hooks/useProgress";
import { getYesterdayKey } from "../utils/date";
import { markDifficult, markRemembered } from "../utils/spacedRepetition";

type Mode = "hard" | "yesterday" | "learning";
export const ReviewPage = () => {
  const { progress, update } = useProgress();
  const [mode, setMode] = useState<Mode>();
  const [index, setIndex] = useState(0);
  const reviewWords = useMemo(() => {
    const sorted = [...words].sort((a, b) => {
      const pa = progress.words[a.id], pb = progress.words[b.id];
      return ((pb?.wrongCount ?? 0) + (pb?.difficult ? 10 : 0) - (pb?.masteryLevel ?? 0))
        - ((pa?.wrongCount ?? 0) + (pa?.difficult ? 10 : 0) - (pa?.masteryLevel ?? 0));
    });
    if (mode === "yesterday") return sorted.filter((w) => progress.words[w.id]?.lastSeenDate === getYesterdayKey()).slice(0, 10);
    if (mode === "learning") return sorted.filter((w) => (progress.words[w.id]?.masteryLevel ?? 0) < 3).slice(0, 10);
    return sorted.filter((w) => progress.words[w.id]?.difficult || (progress.words[w.id]?.wrongCount ?? 0) > 0).slice(0, 10);
  }, [mode, progress.words]);

  if (!mode) return <main className="page"><div className="page-card"><h1>🧠 Ôn lại từ khó</h1><p>Mỗi lượt chỉ 10 từ để Bư Bư học thật nhẹ nhàng.</p>
    <div className="menu-list"><button onClick={() => setMode("hard")}>🤔 Ôn 10 từ khó nhất</button>
      <button onClick={() => setMode("yesterday")}>📅 Ôn từ hôm qua</button>
      <button onClick={() => setMode("learning")}>🌱 Ôn từ chưa thuộc</button></div></div></main>;
  const word = reviewWords[index];
  if (!word) return <main className="page empty-state"><h1>🎉 Chưa có từ nào trong nhóm này!</h1><Link className="button button--primary" to="/">Về trang chủ</Link></main>;
  const next = (hard: boolean) => {
    update((current) => ({ ...current, words: { ...current.words,
      [word.id]: hard ? markDifficult(current.words[word.id], word.id) : markRemembered(current.words[word.id], word.id) } }));
    if (index < reviewWords.length - 1) setIndex(index + 1); else setMode(undefined);
  };
  return <main className="page"><p className="center">{index + 1}/{reviewWords.length}</p><WordCard word={word} onRemember={() => next(false)} onDifficult={() => next(true)} /></main>;
};
