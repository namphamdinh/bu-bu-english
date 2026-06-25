import { Link } from "react-router-dom";
import { Mascot } from "../components/Mascot";
import { useDailyLesson } from "../hooks/useDailyLesson";
import { useProgress } from "../hooks/useProgress";

export const ResultPage = () => {
  const { date, lessonWords } = useDailyLesson();
  const { progress } = useProgress();
  const quiz = progress.quizStates[date];
  const difficult = lessonWords.filter((w) => progress.words[w.id]?.difficult);
  return <main className="page result">
    <Mascot message="Bư Bư giỏi quá!" />
    <h1>Hôm nay Bư Bư hoàn thành nhiệm vụ rồi!</h1>
    <div className="result-grid">
      <div>✅ <strong>{quiz?.correctAnswers ?? 0}/10</strong><span>Câu đúng</span></div>
      <div>⭐ <strong>{quiz?.starsEarned ?? 0}</strong><span>Sao nhận được</span></div>
      <div>🧠 <strong>{10 - difficult.length}</strong><span>Từ đã nhớ</span></div>
      <div>🤔 <strong>{difficult.length}</strong><span>Từ cần ôn</span></div>
    </div>
    {difficult.length > 0 && <div className="info-box"><strong>Từ mình sẽ gặp lại:</strong><p>{difficult.map((w) => `${w.emoji} ${w.word}`).join(" · ")}</p></div>}
    <div className="action-grid"><Link className="button button--accent" to="/review">Ôn lại từ khó</Link>
      <Link className="button button--primary" to="/">Về trang chủ</Link><Link className="button button--soft" to="/vocabulary">Xem kho từ</Link></div>
  </main>;
};
