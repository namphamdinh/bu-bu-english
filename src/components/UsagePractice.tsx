import type { Word } from "../types/word";
import { createUsageExamples } from "../utils/usageExamples";
import { SpeakerButton } from "./SpeakerButton";

export const UsagePractice = ({ words, onDone }: { words: Word[]; onDone: () => void }) => (
  <section className="page-card">
    <div className="section-heading"><span>💬</span><div><h1>Cách dùng từ hôm nay</h1><p>Mỗi câu là một mẫu dùng từ. Con nghe, đọc theo, rồi nhìn giải thích nhé.</p></div></div>
    <div className="usage-list">
      {createUsageExamples(words).map((item) => (
        <article key={item.sentence} className="usage-card">
          <div><small className="usage-title">{item.title}</small><strong>{item.sentence}</strong><span>{item.meaning}</span><em>{item.note}</em></div>
          <SpeakerButton text={item.sentence} />
        </article>
      ))}
    </div>
    <button className="button button--primary button--wide" onClick={onDone}>Con hiểu cách dùng rồi → Làm quiz</button>
  </section>
);
