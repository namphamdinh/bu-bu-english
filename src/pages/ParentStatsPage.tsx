import { words } from "../data/words";
import { useProgress } from "../hooks/useProgress";
import { WORD_CATEGORIES } from "../types/word";

export const ParentStatsPage = () => {
  const { progress, streak, reset } = useProgress();
  const learned = Object.values(progress.words).filter((p) => p.seenCount > 0);
  const mastered = learned.filter((p) => p.masteryLevel === 5);
  const hard = learned.filter((p) => p.difficult);
  const topWrong = [...learned].sort((a, b) => b.wrongCount - a.wrongCount).slice(0, 10);
  const resetData = () => {
    if (window.confirm("Xóa toàn bộ tiến độ của Bư Bư? Việc này không thể hoàn tác.")) reset();
  };
  return <main className="page wide"><div className="page-card"><h1>👪 Góc phụ huynh</h1>
    <div className="result-grid"><div>📖 <strong>{learned.length}</strong><span>Đã học</span></div><div>🏆 <strong>{mastered.length}</strong><span>Đã thuộc</span></div><div>🤔 <strong>{hard.length}</strong><span>Từ khó</span></div><div>🔥 <strong>{streak}</strong><span>Streak</span></div></div>
    <h2>Tiến độ theo chủ đề</h2><div className="category-stats">{WORD_CATEGORIES.map((category) => {
      const categoryWords = words.filter((w) => w.category === category);
      const count = categoryWords.filter((w) => progress.words[w.id]?.seenCount).length;
      return <div key={category}><span>{category}</span><progress value={count} max={categoryWords.length} /><strong>{count}/{categoryWords.length}</strong></div>;
    })}</div>
    <h2>10 từ hay nhầm</h2><div className="chip-list">{topWrong.map((p) => {
      const word = words.find((w) => w.id === p.wordId);
      return word && <span key={p.wordId}>{word.emoji} {word.word} ({p.wrongCount})</span>;
    })}</div>
    <div className="parent-tip"><strong>Gợi ý hôm nay:</strong> Ôn cùng bé 3–5 từ đầu danh sách bằng câu ngắn, đồ vật thật và trò chỉ nhanh.</div>
    <button className="button button--danger" onClick={resetData}>🗑️ Reset toàn bộ dữ liệu</button>
  </div></main>;
};
