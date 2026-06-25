import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { AppProgress } from "../types/progress";
import { calculateStreak, getDateKey } from "../utils/date";
import { emptyProgress, readProgress, STORAGE_KEY, writeProgress } from "../utils/storage";

type ProgressContextValue = {
  progress: AppProgress;
  update: (recipe: (current: AppProgress) => AppProgress) => void;
  reset: () => void;
  streak: number;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState(readProgress);
  const update = (recipe: (current: AppProgress) => AppProgress) => {
    setProgress((current) => {
      const next = recipe(current);
      writeProgress(next);
      return next;
    });
  };
  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(emptyProgress());
  };
  const value = useMemo(() => ({
    progress, update, reset, streak: calculateStreak(progress.studyDates)
  }), [progress]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider");
  return context;
};

export const addStudyDate = (dates: string[]) => {
  const today = getDateKey();
  return dates.includes(today) ? dates : [...dates, today];
};
