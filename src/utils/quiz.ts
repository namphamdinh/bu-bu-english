import type { Word } from "../types/word";
import { sample, shuffle } from "./shuffle";

export type QuestionType = "meaning" | "word" | "emoji" | "missing" | "listening" | "pronunciation" | "collocation";
export type QuizQuestionData = {
  id: string;
  word: Word;
  type: QuestionType;
  prompt: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  speakFirst?: boolean;
};

const types: QuestionType[] = ["meaning", "word", "emoji", "missing", "listening", "pronunciation", "collocation"];

const distractors = (word: Word, all: Word[], field: "word" | "meaning" | "pronunciationText") =>
  sample(all.filter((item) => item.id !== word.id && item.category === word.category), 3)
    .map((item) => item[field]);

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
    speakFirst: type === "listening"
  };
};
