import type { AppProgress } from "../types/progress";

export const STORAGE_KEY = "bu-bu-english-progress-v1";

export const emptyProgress = (): AppProgress => ({
  words: {},
  lessons: {},
  quizStates: {},
  selectedLessonTopicId: "all",
  totalStars: 0,
  badges: [],
  studyDates: []
});

export const readProgress = (): AppProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as Partial<AppProgress>;
    return {
      ...emptyProgress(),
      ...parsed,
      words: parsed.words ?? {},
      lessons: parsed.lessons ?? {},
      quizStates: parsed.quizStates ?? {},
      selectedLessonTopicId: typeof parsed.selectedLessonTopicId === "string" ? parsed.selectedLessonTopicId : "all",
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
      studyDates: Array.isArray(parsed.studyDates) ? parsed.studyDates : []
    };
  } catch {
    return emptyProgress();
  }
};

export const writeProgress = (progress: AppProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // App vẫn hoạt động trong phiên hiện tại khi storage bị chặn hoặc đầy.
  }
};
