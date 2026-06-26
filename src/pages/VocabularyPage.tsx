import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { words } from "../data/words";
import { useProgress } from "../hooks/useProgress";
import { WORD_CATEGORIES } from "../types/word";

const labels = ["Chưa học", "Mới gặp", "Còn khó", "Tạm nhớ", "Nhớ tốt", "Thuộc rồi"];
export const VocabularyPage = () => {
  const { progress } = useProgress();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const category = params.get("category") ?? "";
  const status = params.get("status") ?? "";
  const filtered = useMemo(() => words.filter((word) => {
    const p = progress.words[word.id];
    const matchesText = `${word.word} ${word.meaning}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || word.category === category;
    const matchesStatus = !status
      || (status === "new" && !p)
      || (status === "learning" && p && p.masteryLevel < 5)
      || (status === "hard" && p?.difficult)
      || (status === "mastered" && p?.masteryLevel === 5);
    return matchesText && matchesCategory && matchesStatus;
  }), [category, progress.words, search, status]);
  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next);
  };
  return <main className="page wide"><div className="page-card"><h1>📚 Kho 500 từ đơn</h1>
    <div className="filters"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm apple hoặc quả táo..." />
      <select value={category} onChange={(e) => setFilter("category", e.target.value)}><option value="">Tất cả chủ đề</option>{WORD_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
      <select value={status} onChange={(e) => setFilter("status", e.target.value)}><option value="">Tất cả trạng thái</option><option value="new">Chưa học</option><option value="learning">Đang học</option><option value="hard">Từ khó</option><option value="mastered">Thuộc rồi</option></select>
    </div><p>Tìm thấy <strong>{filtered.length}</strong> từ</p>
    <div className="vocab-grid">{filtered.map((word) => {
      const p = progress.words[word.id]; const level = p?.masteryLevel ?? 0;
      return <Link to={`/word/${word.id}`} key={word.id} className="vocab-item"><span>{word.emoji}</span><div><strong>{word.word}</strong><small>{word.meaning} · {word.category}</small></div><em className={`mastery m${level}`}>{labels[level]}</em></Link>;
    })}</div></div></main>;
};
