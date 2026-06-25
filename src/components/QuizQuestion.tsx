import type { QuizQuestionData } from "../utils/quiz";

export const QuizQuestion = ({ question, selected, onAnswer }: {
  question: QuizQuestionData; selected?: string; onAnswer: (answer: string) => void;
}) => (
  <article className="quiz-card">
    <span className="quiz-emoji">{question.word.emoji}</span>
    <h2>{question.prompt}</h2>
    <div className="answer-grid">
      {question.options.map((option) => {
        const state = selected
          ? option === question.correctAnswer ? "correct" : option === selected ? "wrong" : ""
          : "";
        return <button key={option} className={`answer ${state}`} disabled={Boolean(selected)} onClick={() => onAnswer(option)}>{option}</button>;
      })}
    </div>
    {selected && <div className={`feedback ${selected === question.correctAnswer ? "good" : "try"}`}>
      {selected === question.correctAnswer ? "🌟 Đúng rồi! Thêm một ngôi sao cho Bư Bư!" : `💛 Không sao đâu! ${question.hint}.`}
    </div>}
  </article>
);
