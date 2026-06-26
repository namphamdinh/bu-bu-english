import { useMemo } from "react";
import { getLessonTopic, getWordsForLessonTopic } from "../data/lessonTopics";
import { words, wordsById } from "../data/words";
import { getDateKey } from "../utils/date";
import { generateDailyLessonIds } from "../utils/spacedRepetition";
import { useProgress } from "./useProgress";

export const useDailyLesson = () => {
  const { progress, update } = useProgress();
  const date = getDateKey();
  const topic = getLessonTopic(progress.selectedLessonTopicId);
  const topicWords = getWordsForLessonTopic(words, topic.id);
  let lesson = progress.lessons[date];

  if (!lesson || (lesson.topicId ?? "all") !== topic.id) {
    lesson = {
      date,
      topicId: topic.id,
      wordIds: generateDailyLessonIds(topicWords, progress, 10),
      learnedWordIds: [],
      completed: false
    };
    const created = lesson;
    queueMicrotask(() => update((current) =>
      current.lessons[date] && (current.lessons[date].topicId ?? "all") === created.topicId
        ? current
        : { ...current, lessons: { ...current.lessons, [date]: created } }
    ));
  }

  const lessonWords = useMemo(
    () => lesson.wordIds.map((id) => wordsById.get(id)).filter((word) => word !== undefined),
    [lesson.wordIds]
  );
  return { date, lesson, lessonWords, topic };
};
