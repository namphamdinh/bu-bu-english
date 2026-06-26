import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DailyWordList } from "../components/DailyWordList";
import { MiniStoryCard } from "../components/MiniStoryCard";
import { ProgressBar } from "../components/ProgressBar";
import { UsagePractice } from "../components/UsagePractice";
import { WordCard } from "../components/WordCard";
import { useDailyLesson } from "../hooks/useDailyLesson";
import { addStudyDate, useProgress } from "../hooks/useProgress";
import { markDifficult, markRemembered } from "../utils/spacedRepetition";

export const DailyLessonPage = () => {
  const { date, lesson, lessonWords } = useDailyLesson();
  const { update } = useProgress();
  const navigate = useNavigate();
  const startIndex = Math.min(lesson.learnedWordIds.length, lessonWords.length - 1);
  const [index, setIndex] = useState(startIndex);
  const [showUsage, setShowUsage] = useState(lesson.learnedWordIds.length >= 10);
  const word = lessonWords[index];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index, showUsage]);

  const finishWord = (difficult: boolean) => {
    update((current) => {
      const currentLesson = current.lessons[date] ?? lesson;
      const learned = currentLesson.learnedWordIds.includes(word.id)
        ? currentLesson.learnedWordIds : [...currentLesson.learnedWordIds, word.id];
      return {
        ...current,
        studyDates: addStudyDate(current.studyDates),
        words: {
          ...current.words,
          [word.id]: difficult
            ? markDifficult(current.words[word.id], word.id)
            : markRemembered(current.words[word.id], word.id)
        },
        lessons: { ...current.lessons, [date]: { ...currentLesson, learnedWordIds: learned } }
      };
    });
    if (index >= lessonWords.length - 1) setShowUsage(true);
    else setIndex(index + 1);
  };

  if (!word) return <main className="page"><p>Đang chuẩn bị bài học...</p></main>;
  if (showUsage) return <main className="page"><UsagePractice words={lessonWords} onDone={() => navigate("/quiz")} /></main>;
  return (
    <main className="page">
      <div className="page-top"><button className="icon-button" onClick={() => navigate("/")}>←</button>
        <ProgressBar value={index + 1} max={10} label="Từ hôm nay" /></div>
      <DailyWordList words={lessonWords} current={index} />
      <WordCard word={word} onRemember={() => finishWord(false)} onDifficult={() => finishWord(true)} onQuiz={() => navigate("/quiz")} />
      {(index + 1) % 5 === 0 && <MiniStoryCard words={lessonWords.slice(Math.max(0, index - 4), index + 1)} />}
    </main>
  );
};
