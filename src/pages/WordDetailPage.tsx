import { Link, useParams } from "react-router-dom";
import { PrefixSuffixBox } from "../components/PrefixSuffixBox";
import { SpeakerButton } from "../components/SpeakerButton";
import { WordCard } from "../components/WordCard";
import { wordsById } from "../data/words";
import { useProgress } from "../hooks/useProgress";
import { markDifficult } from "../utils/spacedRepetition";

export const WordDetailPage = () => {
  const id = Number(useParams().id);
  const word = wordsById.get(id);
  const { progress, update } = useProgress();
  if (!word) return <main className="page"><h1>Không tìm thấy từ này.</h1><Link to="/vocabulary">Về kho từ</Link></main>;
  const p = progress.words[id];
  return <main className="page"><WordCard word={word} />
    <section className="page-card"><h2>📊 Lịch sử học</h2><div className="history-grid">
      <span>Đã gặp <strong>{p?.seenCount ?? 0}</strong></span><span>Đúng <strong>{p?.correctCount ?? 0}</strong></span>
      <span>Sai <strong>{p?.wrongCount ?? 0}</strong></span><span>Mức nhớ <strong>{p?.masteryLevel ?? 0}/5</strong></span>
    </div><p>Lần gần nhất: {p?.lastSeenDate ?? "Chưa học"}</p>
    <button className="button button--accent" onClick={() => update((current) => ({ ...current, words: { ...current.words, [id]: markDifficult(current.words[id], id, !p?.difficult) } }))}>
      {p?.difficult ? "Bỏ đánh dấu từ khó" : "Đánh dấu từ khó"}</button></section>
    <section className="page-card"><h2>🎬 Subtitle Practice</h2><p><strong>{word.example}</strong></p><p>{word.exampleMeaning}</p><SpeakerButton text={word.example} /></section>
    <PrefixSuffixBox />
  </main>;
};
