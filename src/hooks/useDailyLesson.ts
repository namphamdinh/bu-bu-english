import { useMemo } from "react";
import { words, wordsById } from "../data/words";
import { getDateKey } from "../utils/date";
import { generateDailyLessonIds } from "../utils/spacedRepetition";
import { useProgress } from "./useProgress";

export const useDailyLesson = () => {
  const { progress, update } = useProgress();
  const date = getDateKey();
  let lesson = progress.lessons[date];

  if (!lesson) {
    lesson = {
      date,
      wordIds: generateDailyLessonIds(words, progress, 10),
      learnedWordIds: [],
      completed: false
    };
    const created = lesson;
    queueMicrotask(() => update((current) =>
      current.lessons[date] ? current : {
        ...current, lessons: { ...current.lessons, [date]: created }
      }
    ));
  }

  const lessonWords = useMemo(
    () => lesson.wordIds.map((id) => wordsById.get(id)).filter((word) => word !== undefined),
    [lesson.wordIds]
  );
  return { date, lesson, lessonWords };
};
