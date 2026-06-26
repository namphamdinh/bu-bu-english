import type { Word } from "../types/word";
import { sample, shuffle } from "./shuffle";

export type QuestionType =
  | "meaning"
  | "word"
  | "emoji"
  | "missing"
  | "listening"
  | "pronunciation"
  | "collocation"
  | "spellingChoice"
  | "listenWord"
  | "soundDiscrimination";
export type QuizQuestionData = {
  id: string;
  word: Word;
  type: QuestionType;
  prompt: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  speakFirst?: boolean;
  speakText?: string;
  optionSpeakTexts?: Record<string, string>;
  instruction?: string;
};

const types: QuestionType[] = [
  "meaning",
  "word",
  "emoji",
  "missing",
  "listening",
  "pronunciation",
  "collocation",
  "spellingChoice",
  "listenWord",
  "soundDiscrimination"
];

const distractors = (word: Word, all: Word[], field: "word" | "meaning" | "pronunciationText") =>
  sample(all.filter((item) => item.id !== word.id && item.category === word.category), 3)
    .map((item) => item[field]);

const nearSoundWords: Record<string, string[]> = {
  monkey: ["money", "Monday", "many"],
  money: ["monkey", "many", "mommy"],
  cat: ["cap", "cut", "can"],
  ship: ["sheep", "shop", "chip"],
  sheep: ["ship", "cheap", "shop"],
  foot: ["food", "good", "full"],
  food: ["foot", "good", "fruit"],
  work: ["walk", "word", "world"],
  walk: ["work", "wall", "wake"],
  like: ["lake", "light", "lick"],
  ball: ["bowl", "bell", "bull"],
  bird: ["bed", "bad", "beard"],
  three: ["tree", "free", "tea"],
  tree: ["three", "tea", "try"],
  rice: ["rise", "ice", "race"],
  mouse: ["mouth", "house", "mice"],
  sail: ["sale", "say", "seal"]
};

const replaceAt = (value: string, index: number, letter: string) =>
  value.slice(0, index) + letter + value.slice(index + 1);

const makeMisspellings = (value: string) => {
  const clean = value.toLowerCase().replace(/[^a-z]/g, "");
  if (clean.length < 3) return sample(["cat", "dog", "sun", "red"].filter((item) => item !== clean), 3);
  const swaps: Record<string, string[]> = {
    a: ["e", "o"], e: ["a", "i"], i: ["e", "y"], o: ["a", "u"], u: ["o", "a"],
    b: ["d", "p"], d: ["b", "t"], p: ["b", "q"], m: ["n", "w"], n: ["m", "h"],
    c: ["k", "s"], k: ["c", "g"], g: ["c", "q"], t: ["d", "f"], f: ["v", "t"],
    l: ["r", "i"], r: ["l", "n"], s: ["z", "c"], y: ["i", "e"]
  };
  const variants = new Set<string>();
  for (let index = 0; index < clean.length && variants.size < 6; index += 1) {
    const alternatives = swaps[clean[index]] ?? ["a", "e", "i", "o"];
    alternatives.forEach((letter) => {
      const next = replaceAt(clean, index, letter);
      if (next !== clean) variants.add(next);
    });
  }
  return sample([...variants], 3);
};

const makeNearSoundOptions = (word: Word, all: Word[]) => {
  const custom = nearSoundWords[word.word.toLowerCase()] ?? [];
  const byLength = all
    .filter((item) => item.id !== word.id && Math.abs(item.word.length - word.word.length) <= 2)
    .map((item) => item.word);
  return sample([...new Set([...custom, ...byLength])].filter((item) => item.toLowerCase() !== word.word.toLowerCase()), 3);
};

export const createQuestion = (
  word: Word,
  all: Word[],
  date: string,
  usedIds: string[],
  previousType?: QuestionType
): QuizQuestionData => {
  const available = shuffle(types).filter((type) =>
    type !== previousType && !usedIds.includes(`${date}-${word.id}-${type}`)
  );
  const type = available[0] ?? "meaning";
  const base = { id: `${date}-${word.id}-${type}`, word, type, hint: `${word.word} = ${word.meaning}` };

  if (type === "word" || type === "emoji") {
    return {
      ...base,
      prompt: type === "emoji" ? `${word.emoji} Đây là từ nào?` : `“${word.meaning}” trong tiếng Anh là gì?`,
      options: shuffle([word.word, ...distractors(word, all, "word")]),
      correctAnswer: word.word
    };
  }
  if (type === "missing") {
    const index = Math.max(1, Math.floor(word.word.length / 2));
    const missing = word.word[index] ?? word.word[0];
    const shown = word.word.slice(0, index) + "_" + word.word.slice(index + 1);
    const letters = shuffle([missing, ...sample("abcdefghijklmnopqrstuvwxyz".split("").filter((c) => c !== missing), 3)]);
    return { ...base, prompt: `Điền chữ còn thiếu: ${shown}`, options: letters, correctAnswer: missing };
  }
  if (type === "spellingChoice") {
    return {
      ...base,
      prompt: `Chọn từ viết đúng của “${word.meaning}”`,
      instruction: "Các đáp án sai chỉ khác 1 chữ, con nhìn thật kỹ nhé.",
      options: shuffle([word.word, ...makeMisspellings(word.word)]),
      correctAnswer: word.word
    };
  }
  if (type === "listenWord") {
    return {
      ...base,
      prompt: "Con nghe cô đọc rồi chọn đúng từ tiếng Anh.",
      instruction: "Nếu điện thoại đọc chưa rõ, con có thể bấm nghe lại.",
      options: shuffle([word.word, ...distractors(word, all, "word")]),
      correctAnswer: word.word,
      speakFirst: true,
      speakText: word.word
    };
  }
  if (type === "soundDiscrimination") {
    const options = shuffle([word.word, ...makeNearSoundOptions(word, all)]);
    return {
      ...base,
      prompt: `Từ cần tìm là “${word.word}”. Nghe từng lựa chọn rồi chọn tiếng đọc đúng.`,
      instruction: "Bài này luyện phân biệt các từ nghe gần giống nhau, ví dụ monkey và money.",
      options,
      correctAnswer: word.word,
      optionSpeakTexts: Object.fromEntries(options.map((option) => [option, option]))
    };
  }
  if (type === "pronunciation") {
    return {
      ...base, prompt: `Cách đọc gần đúng của “${word.word}” là gì?`,
      options: shuffle([word.pronunciationText, ...distractors(word, all, "pronunciationText")]),
      correctAnswer: word.pronunciationText
    };
  }
  if (type === "collocation") {
    const correct = word.collocations?.[0] ?? `my ${word.word}`;
    return {
      ...base, prompt: `Cụm nào dùng tự nhiên với “${word.word}”?`,
      options: shuffle([correct, `eat ${word.word}`, `play ${word.word}`, `run ${word.word}`]),
      correctAnswer: correct
    };
  }
  return {
    ...base,
    prompt: type === "listening" ? "Con nghe thấy từ nào? Từ đó nghĩa là gì?" : `“${word.word}” nghĩa là gì?`,
    options: shuffle([word.meaning, ...distractors(word, all, "meaning")]),
    correctAnswer: word.meaning,
    speakFirst: type === "listening",
    speakText: word.word
  };
};
