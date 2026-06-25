export const WORD_CATEGORIES = [
  "Family", "Animals", "Food", "Colors", "Numbers", "Body", "School", "Toys",
  "House", "Clothes", "Actions", "Feelings", "Nature", "Vehicles", "Daily Life",
  "Shopping", "Weather", "Time", "Places", "Opposites"
] as const;

export type WordCategory = (typeof WORD_CATEGORIES)[number];

export type Word = {
  id: number;
  word: string;
  meaning: string;
  category: WordCategory;
  emoji: string;
  pronunciation: string;
  pronunciationText: string;
  syllables: string[];
  vietnameseGuide: string;
  mouthTip: string;
  commonMistake: string;
  example: string;
  exampleMeaning: string;
  explanation: string;
  memoryTip: string;
  collocations?: string[];
  relatedWords?: string[];
  prefixNote?: string;
  suffixNote?: string;
};
