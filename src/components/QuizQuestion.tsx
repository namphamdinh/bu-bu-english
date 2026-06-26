import type { QuizQuestionData } from "../utils/quiz";

export const QuizQuestion = ({ question, selected, onAnswer, onSpeakOption }: {
  question: QuizQuestionData;
  selected?: string;
  onAnswer: (answer: string) => void;
  onSpeakOption?: (text: string) => void;
}) => (
  <article className="quiz-card">
    <span className="quiz-emoji">{question.word.emoji}</span>
    <h2>{question.prompt}</h2>
    {question.instruction && <p className="quiz-instruction">{question.instruction}</p>}
    <div className="answer-grid">
      {question.options.map((option) => {
        const state = selected
          ? option === question.correctAnswer ? "correct" : option === selected ? "wrong" : ""
          : "";
        const speakText = question.optionSpeakTexts?.[option];
        return <button key={option} className={`answer ${state}`} disabled={Boolean(selected)} onClick={() => onAnswer(option)}>
          {speakText && <span
            className="answer-sound"
            role="button"
            tabIndex={0}
            aria-label={`Nghe ${option}`}
            onClick={(event) => { event.stopPropagation(); onSpeakOption?.(speakText); }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.stopPropagation();
                onSpeakOption?.(speakText);
              }
            }}
          >🔊</span>}
          <span>{option}</span>
        </button>;
      })}
    </div>
    {selected && <div className={`feedback ${selected === question.correctAnswer ? "good" : "try"}`}>
      {selected === question.correctAnswer ? "🌟 Đúng rồi! Thêm một ngôi sao cho Bư Bư!" : `💛 Không sao đâu! ${question.hint}.`}
    </div>}
  </article>
);
