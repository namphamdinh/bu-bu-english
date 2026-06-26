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
  partOfSpeech?: "noun" | "verb" | "adjective" | "adverb" | "pronoun" | "preposition" | "conjunction" | "determiner" | "number" | "other";
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
  grammarNote?: string;
  memoryTip: string;
  collocations?: string[];
  relatedWords?: string[];
  prefixNote?: string;
  suffixNote?: string;
};
