import { useState } from "react";
import type { Word } from "../types/word";
import { LESSON_TOPICS } from "../data/lessonTopics";
import { createUsageExamples } from "../utils/usageExamples";
import { SpeakerButton } from "./SpeakerButton";

export const UsagePractice = ({ words, currentTopicId, onDone, onStop, onContinue }: {
  words: Word[];
  currentTopicId: string;
  onDone: () => void;
  onStop: () => void;
  onContinue: (topicId: string) => void;
}) => {
  const [nextTopic, setNextTopic] = useState(currentTopicId);
  return (
    <section className="page-card">
      <div className="section-heading"><span>💬</span><div><h1>Cách dùng từ hôm nay</h1><p>Mỗi từ có nhiều mẫu câu khác nhau để tránh học vẹt một câu duy nhất.</p></div></div>
      <div className="usage-list">
        {createUsageExamples(words).map((item) => (
          <article key={item.sentence} className="usage-card">
            <div><small className="usage-title">{item.title}</small><strong>{item.sentence}</strong><span>{item.meaning}</span><em>{item.note}</em></div>
            <SpeakerButton text={item.sentence} />
          </article>
        ))}
      </div>
      <div className="continue-box">
        <h2>Học tiếp hay dừng?</h2>
        <p>Bư Bư có thể làm quiz ngay, nghỉ ở đây, hoặc học thêm 10 từ nữa.</p>
        <label>Chọn bài tiếp theo
          <select value={nextTopic} onChange={(event) => setNextTopic(event.target.value)}>
            {LESSON_TOPICS.map((topic) => <option key={topic.id} value={topic.id}>{topic.emoji} {topic.id === "all" ? "Ngẫu nhiên lộn xộn" : topic.label}</option>)}
          </select>
        </label>
        <div className="action-grid">
          <button className="button button--primary" onClick={onDone}>🎯 Làm quiz 10 từ này</button>
          <button className="button button--success" onClick={() => onContinue(nextTopic)}>🚀 Học tiếp 10 từ nữa</button>
          <button className="button button--soft" onClick={onStop}>🏠 Dừng lại</button>
        </div>
      </div>
    </section>
  );
};
