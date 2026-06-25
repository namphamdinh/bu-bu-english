export const getDateKey = (date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getYesterdayKey = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return getDateKey(date);
};

export const calculateStreak = (dates: string[]): number => {
  const unique = new Set(dates);
  let cursor = new Date();
  if (!unique.has(getDateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (unique.has(getDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};
