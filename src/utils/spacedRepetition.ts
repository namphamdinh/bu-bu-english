import type { AppProgress, MasteryLevel, WordProgress } from "../types/progress";
import type { Word } from "../types/word";
import { getDateKey } from "./date";

export const createWordProgress = (wordId: number): WordProgress => ({
  wordId, seenCount: 0, correctCount: 0, wrongCount: 0, correctStreak: 0,
  difficult: false, masteryLevel: 0
});

const clampMastery = (value: number): MasteryLevel =>
  Math.max(0, Math.min(5, value)) as MasteryLevel;

export const updateAnswer = (
  current: WordProgress | undefined,
  wordId: number,
  correct: boolean
): WordProgress => {
  const base = current ?? createWordProgress(wordId);
  const today = getDateKey();
  if (correct) {
    const streak = base.correctStreak + 1;
    return {
      ...base,
      seenCount: base.seenCount + 1,
      correctCount: base.correctCount + 1,
      correctStreak: streak,
      masteryLevel: clampMastery(base.masteryLevel + (streak >= 2 ? 1 : 0)),
      difficult: base.difficult && base.wrongCount > base.correctCount + 1,
      lastSeenDate: today,
      lastCorrectDate: today
    };
  }
  const wrongCount = base.wrongCount + 1;
  return {
    ...base,
    seenCount: base.seenCount + 1,
    wrongCount,
    correctStreak: 0,
    masteryLevel: clampMastery(base.masteryLevel - 1),
    difficult: base.difficult || wrongCount >= 2,
    lastSeenDate: today
  };
};

export const markRemembered = (current: WordProgress | undefined, wordId: number): WordProgress => {
  const base = current ?? createWordProgress(wordId);
  return {
    ...base, seenCount: base.seenCount + 1,
    masteryLevel: clampMastery(Math.max(1, base.masteryLevel + 1)),
    lastSeenDate: getDateKey()
  };
};

export const markDifficult = (current: WordProgress | undefined, wordId: number, value = true): WordProgress => {
  const base = current ?? createWordProgress(wordId);
  return {
    ...base, difficult: value,
    masteryLevel: value ? clampMastery(Math.min(2, base.masteryLevel)) : base.masteryLevel,
    lastSeenDate: getDateKey()
  };
};

const priority = (word: Word, progress: AppProgress): number => {
  const item = progress.words[word.id];
  if (!item) return 14;
  let score = 2 + (5 - item.masteryLevel) * 2;
  if (item.masteryLevel <= 2) score += 5;
  if (item.difficult) score += 7;
  score += Math.min(7, item.wrongCount * 1.5);
  if (item.masteryLevel === 5) score *= 0.25;
  return Math.max(0.25, score);
};

/** Chọn không hoàn lại: mỗi vòng rút một từ theo trọng số rồi loại khỏi pool. */
export const generateDailyLessonIds = (
  words: Word[], progress: AppProgress, count = 10
): number[] => {
  const pool = [...words];
  const result: number[] = [];
  while (pool.length && result.length < count) {
    const weights = pool.map((word) => priority(word, progress) * (0.75 + Math.random() * 0.5));
    const total = weights.reduce((sum, value) => sum + value, 0);
    let roll = Math.random() * total;
    let index = 0;
    for (; index < pool.length - 1; index += 1) {
      roll -= weights[index];
      if (roll <= 0) break;
    }
    result.push(pool[index].id);
    pool.splice(index, 1);
  }
  return result;
};
