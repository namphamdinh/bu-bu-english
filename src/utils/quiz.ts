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
  | "soundDiscrimination"
  | "sentenceChoice"
  | "sentenceGap"
  | "miniDialog"
  | "oddOneOut"
  | "listenSentence";
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
  "soundDiscrimination",
  "sentenceChoice",
  "sentenceGap",
  "miniDialog",
  "oddOneOut",
  "listenSentence"
];

const distractors = (word: Word, all: Word[], field: "word" | "meaning" | "pronunciationText") =>
  sample(all.filter((item) => item.id !== word.id && item.category === word.category), 3)
    .map((item) => item[field]);

const uniqueOptions = (options: string[]) => [...new Set(options)].filter(Boolean).slice(0, 4);

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

const isVerb = (word: Word) => word.partOfSpeech === "verb";
const isAdjective = (word: Word) => word.partOfSpeech === "adjective";
const isNoun = (word: Word) => word.partOfSpeech === "noun";

const wordsByPart = (word: Word, all: Word[], predicate: (item: Word) => boolean) =>
  sample(all.filter((item) => item.id !== word.id && predicate(item)), 3).map((item) => item.word);

const sentenceWithGap = (word: Word) =>
  word.example.replace(new RegExp(`\\b${word.word}\\b`, "i"), "____")
    .replace(/\bLearning\b/, "____");

const sentenceAnswer = (word: Word) =>
  word.word === "learn" ? "Learning" : word.word;

const sentenceDistractors = (word: Word, all: Word[]) => {
  if (word.word === "learn") return ["Learn", "Learns", "A learn"];
  if (isVerb(word)) return sample([`${word.word}s`, `${word.word}ing`, `a ${word.word}`, ...wordsByPart(word, all, isVerb)], 3);
  if (isAdjective(word)) return sample([`a ${word.word}`, `${word.word}s`, ...wordsByPart(word, all, isAdjective)], 3);
  return sample([`to ${word.word}`, `${word.word}ing`, ...wordsByPart(word, all, isNoun)], 3);
};

const sentenceChoiceOptions = (word: Word) => {
  const wrongByPart = word.partOfSpeech === "verb"
    ? [`This is a ${word.word}.`, `I can ${word.word}s.`, `I am ${word.word}.`]
    : word.partOfSpeech === "adjective"
      ? [`This is a ${word.word}.`, `I can ${word.word}.`, `I eat ${word.word}.`]
      : [`I can ${word.word}.`, `I am ${word.word}.`, `Let's ${word.word}.`];
  return shuffle([word.example, ...wrongByPart]);
};

const dialogFor = (word: Word) => {
  if (word.word === "like") return { prompt: "Bư Bư: What do you like? Con chọn câu trả lời tự nhiên.", correct: "I like football.", wrong: ["I am like.", "I can like football.", "This is a like."] };
  if (isVerb(word)) return { prompt: `Mẹ hỏi: Can you ${word.word}?`, correct: `Yes, I can ${word.word}.`, wrong: [`Yes, I am ${word.word}.`, `Yes, a ${word.word}.`, `Yes, I ${word.word}s.`] };
  if (isAdjective(word)) return { prompt: `Cô hỏi: How do you feel?`, correct: `I am ${word.word}.`, wrong: [`I can ${word.word}.`, `This is a ${word.word}.`, `I eat ${word.word}.`] };
  return { prompt: `Cô hỏi: What is this? ${word.emoji}`, correct: `It is ${/^[aeiou]/i.test(word.word) ? "an" : "a"} ${word.word}.`, wrong: [`I can ${word.word}.`, `I am ${word.word}.`, `Let's ${word.word}.`] };
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
      options: uniqueOptions(shuffle([word.word, ...distractors(word, all, "word")])),
      correctAnswer: word.word
    };
  }
  if (type === "missing") {
    const index = Math.max(1, Math.floor(word.word.length / 2));
    const missing = word.word[index] ?? word.word[0];
    const shown = word.word.slice(0, index) + "_" + word.word.slice(index + 1);
    const letters = uniqueOptions(shuffle([missing, ...sample("abcdefghijklmnopqrstuvwxyz".split("").filter((c) => c !== missing), 3)]));
    return { ...base, prompt: `Điền chữ còn thiếu: ${shown}`, options: letters, correctAnswer: missing };
  }
  if (type === "spellingChoice") {
    return {
      ...base,
      prompt: `Chọn từ viết đúng của “${word.meaning}”`,
      instruction: "Các đáp án sai chỉ khác 1 chữ, con nhìn thật kỹ nhé.",
      options: uniqueOptions(shuffle([word.word, ...makeMisspellings(word.word)])),
      correctAnswer: word.word
    };
  }
  if (type === "listenWord") {
    return {
      ...base,
      prompt: "Con nghe cô đọc rồi chọn đúng từ tiếng Anh.",
      instruction: "Nếu điện thoại đọc chưa rõ, con có thể bấm nghe lại.",
      options: uniqueOptions(shuffle([word.word, ...distractors(word, all, "word")])),
      correctAnswer: word.word,
      speakFirst: true,
      speakText: word.word
    };
  }
  if (type === "soundDiscrimination") {
    const options = uniqueOptions(shuffle([word.word, ...makeNearSoundOptions(word, all)]));
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
      options: uniqueOptions(shuffle([word.pronunciationText, ...distractors(word, all, "pronunciationText")])),
      correctAnswer: word.pronunciationText
    };
  }
  if (type === "sentenceChoice") {
    return {
      ...base,
      prompt: `Câu nào dùng “${word.word}” đúng và tự nhiên nhất?`,
      instruction: "Con đọc cả câu, đừng chỉ nhìn từng từ riêng lẻ.",
      options: uniqueOptions(sentenceChoiceOptions(word)),
      correctAnswer: word.example,
      hint: word.grammarNote ?? base.hint
    };
  }
  if (type === "sentenceGap") {
    const answer = sentenceAnswer(word);
    return {
      ...base,
      prompt: `Điền vào chỗ trống: ${sentenceWithGap(word)}`,
      instruction: "Bài này luyện dùng từ trong câu, giống bài đọc-viết cho trẻ nhỏ.",
      options: uniqueOptions(shuffle([answer, ...sentenceDistractors(word, all)])),
      correctAnswer: answer,
      hint: word.grammarNote ?? base.hint
    };
  }
  if (type === "miniDialog") {
    const dialog = dialogFor(word);
    return {
      ...base,
      prompt: dialog.prompt,
      instruction: "Chọn câu trả lời nghe tự nhiên trong hội thoại.",
      options: uniqueOptions(shuffle([dialog.correct, ...dialog.wrong])),
      correctAnswer: dialog.correct,
      hint: word.grammarNote ?? base.hint
    };
  }
  if (type === "oddOneOut") {
    const same = sample(all.filter((item) => item.id !== word.id && item.category === word.category), 3);
    const other = sample(all.filter((item) => item.category !== word.category), 1)[0];
    const options = uniqueOptions(shuffle([...same.map((item) => item.word), other?.word ?? word.word]));
    return {
      ...base,
      prompt: `Từ nào khác nhóm với chủ đề “${word.category}”?`,
      instruction: "Bài này luyện nhìn nhóm nghĩa, giống trò tìm bạn khác nhóm.",
      options,
      correctAnswer: other?.word ?? word.word,
      hint: other ? `${other.word} thuộc nhóm ${other.category}, không cùng nhóm ${word.category}.` : base.hint
    };
  }
  if (type === "listenSentence") {
    return {
      ...base,
      prompt: "Con nghe cả câu rồi chọn từ khóa xuất hiện trong câu.",
      instruction: "Nghe câu trọn vẹn giúp con nhớ từ trong ngữ cảnh.",
      options: uniqueOptions(shuffle([word.word, ...distractors(word, all, "word")])),
      correctAnswer: word.word,
      speakFirst: true,
      speakText: word.example,
      hint: `Câu là: ${word.example}`
    };
  }
  if (type === "collocation") {
    const correct = word.collocations?.[0] ?? word.example;
    return {
      ...base, prompt: `Cụm nào dùng tự nhiên với “${word.word}”?`,
      options: uniqueOptions(shuffle([correct, word.example, `I can ${word.word}.`, `This is a ${word.word}.`, `I like ${word.word}.`])),
      correctAnswer: correct,
      hint: word.grammarNote ?? base.hint
    };
  }
  return {
    ...base,
    prompt: type === "listening" ? "Con nghe thấy từ nào? Từ đó nghĩa là gì?" : `“${word.word}” nghĩa là gì?`,
    options: uniqueOptions(shuffle([word.meaning, ...distractors(word, all, "meaning")])),
    correctAnswer: word.meaning,
    speakFirst: type === "listening",
    speakText: word.word
  };
};
