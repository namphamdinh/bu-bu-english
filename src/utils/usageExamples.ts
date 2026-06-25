import type { Word } from "../types/word";

export type UsageExample = { sentence: string; meaning: string; words: string[] };

const templates: Record<string, (word: Word) => UsageExample> = {
  Actions: (w) => ({ sentence: `I can ${w.word}.`, meaning: `Con có thể ${w.meaning}.`, words: [w.word] }),
  Feelings: (w) => ({ sentence: `I am ${w.word}.`, meaning: `Con cảm thấy ${w.meaning}.`, words: [w.word] }),
  Colors: (w) => ({ sentence: `I like ${w.word}.`, meaning: `Con thích màu ${w.meaning.replace("màu ", "")}.`, words: [w.word] }),
  Animals: (w) => ({ sentence: `I see a ${w.word}.`, meaning: `Con nhìn thấy ${w.meaning}.`, words: [w.word] }),
  Food: (w) => ({ sentence: `I like ${w.word}.`, meaning: `Con thích ${w.meaning}.`, words: [w.word] })
};

export const createUsageExamples = (lessonWords: Word[]): UsageExample[] => {
  const special: Record<string, UsageExample> = {
    like: { sentence: "I like football.", meaning: "Con thích bóng đá.", words: ["like", "football"] },
    work: { sentence: "My mom works.", meaning: "Mẹ của con làm việc.", words: ["work"] },
    sail: { sentence: "The boat can sail.", meaning: "Con thuyền có thể ra khơi.", words: ["sail", "boat"] },
    football: { sentence: "I play football.", meaning: "Con chơi bóng đá.", words: ["football"] },
    cat: { sentence: "I see a cat.", meaning: "Con nhìn thấy một con mèo.", words: ["cat"] }
  };
  const examples = lessonWords.map((word) => special[word.word] ??
    (templates[word.category] ?? ((w: Word) => ({
      sentence: `This is my ${w.word}.`,
      meaning: `Đây là ${w.meaning} của con.`,
      words: [w.word]
    })))(word)
  );
  const cat = lessonWords.find((w) => w.word === "cat");
  const run = lessonWords.find((w) => w.word === "run");
  if (cat && run) {
    examples.unshift({ sentence: "The cat can run.", meaning: "Con mèo có thể chạy.", words: ["cat", "run"] });
  }
  return examples.slice(0, 10);
};
