import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "../components/ProgressBar";
import { QuizQuestion } from "../components/QuizQuestion";
import { useDailyLesson } from "../hooks/useDailyLesson";
import { addStudyDate, useProgress } from "../hooks/useProgress";
import { useSpeech } from "../hooks/useSpeech";
import type { QuestionType } from "../utils/quiz";
import { createQuestion } from "../utils/quiz";
import { updateAnswer } from "../utils/spacedRepetition";
import { words } from "../data/words";

export const QuizPage = () => {
  const { date, lessonWords } = useDailyLesson();
  const { progress, update } = useProgress();
  const { speak, isSupported } = useSpeech();
  const navigate = useNavigate();
  const state = progress.quizStates[date] ?? { date, askedQuestionIds: [], completedWordIds: [], correctAnswers: 0, starsEarned: 0 };
  const [index, setIndex] = useState(Math.min(state.completedWordIds.length, 9));
  const [selected, setSelected] = useState<string>();
  const [previousType, setPreviousType] = useState<QuestionType>();
  const question = useMemo(() =>
    createQuestion(lessonWords[index], words, date, state.askedQuestionIds, previousType),
    [date, index, lessonWords, previousType, state.askedQuestionIds]
  );

  useEffect(() => {
    if (question.speakFirst) {
      speak(question.word.word, { rate: 0.85, lang: "en-US" });
    }
  }, [question, speak]);

  const answer = (value: string) => {
    setSelected(value);
    const correct = value === question.correctAnswer;
    update((current) => {
      const old = current.quizStates[date] ?? state;
      return {
        ...current,
        totalStars: current.totalStars + (correct ? 1 : 0),
        studyDates: addStudyDate(current.studyDates),
        words: { ...current.words, [question.word.id]: updateAnswer(current.words[question.word.id], question.word.id, correct) },
        quizStates: { ...current.quizStates, [date]: {
          ...old,
          askedQuestionIds: old.askedQuestionIds.includes(question.id) ? old.askedQuestionIds : [...old.askedQuestionIds, question.id],
          completedWordIds: old.completedWordIds.includes(question.word.id) ? old.completedWordIds : [...old.completedWordIds, question.word.id],
          correctAnswers: old.correctAnswers + (correct ? 1 : 0),
          starsEarned: old.starsEarned + (correct ? 1 : 0)
        }}
      };
    });
    window.setTimeout(() => {
      if (index >= lessonWords.length - 1) {
        update((current) => ({
          ...current,
          badges: current.badges.includes(`daily-${date}`) ? current.badges : [...current.badges, `daily-${date}`],
          lessons: { ...current.lessons, [date]: { ...current.lessons[date], completed: true } }
        }));
        navigate("/result");
      } else {
        setPreviousType(question.type); setIndex(index + 1); setSelected(undefined);
      }
    }, 1000);
  };

  if (!question) return null;
  return <main className="page"><ProgressBar value={index + 1} max={10} label="Quiz hôm nay" />
    {question.speakFirst && !isSupported && <p className="speech-fallback">Máy này chưa hỗ trợ đọc tiếng Anh tự động. Bư Bư vẫn có thể nhìn cách đọc và học bình thường nhé!</p>}
    <QuizQuestion question={question} selected={selected} onAnswer={answer} /></main>;
};
