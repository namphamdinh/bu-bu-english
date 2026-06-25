export type MasteryLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type WordProgress = {
  wordId: number;
  seenCount: number;
  correctCount: number;
  wrongCount: number;
  correctStreak: number;
  difficult: boolean;
  lastSeenDate?: string;
  lastCorrectDate?: string;
  masteryLevel: MasteryLevel;
};

export type DailyLesson = {
  date: string;
  wordIds: number[];
  learnedWordIds: number[];
  completed: boolean;
};

export type DailyQuizState = {
  date: string;
  askedQuestionIds: string[];
  completedWordIds: number[];
  correctAnswers: number;
  starsEarned: number;
};

export type AppProgress = {
  words: Record<number, WordProgress>;
  lessons: Record<string, DailyLesson>;
  quizStates: Record<string, DailyQuizState>;
  totalStars: number;
  badges: string[];
  studyDates: string[];
};
