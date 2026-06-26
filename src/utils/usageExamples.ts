import type { Word } from "../types/word";

export type UsageExample = {
  title: string;
  sentence: string;
  meaning: string;
  note: string;
  words: string[];
};

const article = (word: string) => /^[aeiou]/i.test(word) ? "an" : "a";
const stripMeaning = (value: string) => value.replace(/^màu\s+/i, "");

const noArticleFoods = new Set(["rice", "bread", "cheese", "meat", "noodles", "breakfast", "lunch", "dinner"]);
const drinkWords = new Set(["milk", "water", "juice", "soup"]);
const familyPlural = new Set(["parents", "children"]);

const objectOf = (word: Word) => {
  if (word.category === "Food" && noArticleFoods.has(word.word)) return word.word;
  if (word.category === "Family") return `my ${word.word}`;
  if (word.category === "Body") return `my ${word.word}`;
  return `${article(word.word)} ${word.word}`;
};

const exampleForWord = (word: Word, index: number): UsageExample => {
  const special: Record<string, UsageExample> = {
    learn: {
      title: "Biến hành động thành hoạt động",
      sentence: "Learning English is really fun.",
      meaning: "Việc học tiếng Anh thật sự rất vui.",
      note: "learn là động từ. Khi muốn nói “việc học” ở đầu câu, thêm -ing thành learning.",
      words: ["learn", "learning"]
    },
    like: {
      title: "Nói sở thích",
      sentence: "I like football.",
      meaning: "Con thích bóng đá.",
      note: "like là động từ. Sau like có thể đặt một danh từ như football.",
      words: ["like", "football"]
    },
    work: {
      title: "Nói ai đó làm việc",
      sentence: "My mom works.",
      meaning: "Mẹ của con làm việc.",
      note: "Với he/she/my mom, động từ thường thêm -s: work → works.",
      words: ["work", "works"]
    },
    homework: {
      title: "Cụm dùng đúng",
      sentence: "I do homework.",
      meaning: "Con làm bài tập về nhà.",
      note: "Tiếng Anh nói do homework, không nói make homework hoặc a homework.",
      words: ["homework"]
    }
  };
  if (special[word.word]) return special[word.word];

  if (word.partOfSpeech === "verb") {
    const patterns = [
      {
        title: "Mẫu “I can...”",
        sentence: `I can ${word.word}.`,
        meaning: `Con có thể ${word.meaning}.`,
        note: `Sau can dùng động từ nguyên mẫu: can ${word.word}.`
      },
      {
        title: "Mẫu “Let’s...”",
        sentence: `Let's ${word.word}.`,
        meaning: `Mình cùng ${word.meaning} nhé.`,
        note: "Let’s dùng để rủ ai đó cùng làm một việc."
      },
      {
        title: "Mẫu “I like to...”",
        sentence: `I like to ${word.word}.`,
        meaning: `Con thích ${word.meaning}.`,
        note: "like to + động từ dùng để nói việc con thích làm."
      }
    ];
    return { ...patterns[index % patterns.length], words: [word.word] };
  }

  if (word.partOfSpeech === "adjective") {
    const noun = word.category === "Colors" ? "ball" : "day";
    const patterns = [
      {
        title: "Miêu tả bằng tính từ",
        sentence: word.category === "Feelings" ? `I am ${word.word}.` : `It is ${word.word}.`,
        meaning: word.category === "Feelings" ? `Con cảm thấy ${word.meaning}.` : `Nó ${word.meaning}.`,
        note: "Tính từ có thể đứng sau am/is/are."
      },
      {
        title: "Tính từ đứng trước danh từ",
        sentence: `I see a ${word.word} ${noun}.`,
        meaning: `Con nhìn thấy một ${noun} ${stripMeaning(word.meaning)}.`,
        note: `Trong tiếng Anh, tính từ đứng trước danh từ: ${word.word} ${noun}.`
      }
    ];
    return { ...patterns[index % patterns.length], words: [word.word] };
  }

  if (word.category === "Food") {
    const verb = drinkWords.has(word.word) ? "drink" : "eat";
    const object = drinkWords.has(word.word) || noArticleFoods.has(word.word) ? word.word : `${article(word.word)} ${word.word}`;
    return {
      title: verb === "drink" ? "Đồ uống đi với drink" : "Đồ ăn đi với eat",
      sentence: `I ${verb} ${object}.`,
      meaning: verb === "drink" ? `Con uống ${word.meaning}.` : `Con ăn ${word.meaning}.`,
      note: `${word.word} dùng tự nhiên trong câu này hơn là dịch từng chữ.`,
      words: [word.word, verb]
    };
  }

  if (word.category === "Family") {
    const plural = familyPlural.has(word.word) || word.word.endsWith("s");
    return {
      title: "Nói về người thân",
      sentence: plural ? `These are my ${word.word}.` : `This is my ${word.word}.`,
      meaning: `Đây là ${word.meaning} của con.`,
      note: "Với người thân, mẫu tự nhiên là my + danh từ.",
      words: [word.word]
    };
  }

  if (word.category === "Animals") {
    return {
      title: "Nói con nhìn thấy gì",
      sentence: `I see ${article(word.word)} ${word.word}.`,
      meaning: `Con nhìn thấy ${word.meaning}.`,
      note: "I see... dùng để nói con nhìn thấy một vật/con vật.",
      words: [word.word]
    };
  }

  return {
    title: "Gọi tên một vật",
    sentence: `This is ${objectOf(word)}.`,
    meaning: `Đây là ${word.meaning}.`,
    note: word.partOfSpeech === "noun" ? "Danh từ dùng để gọi tên người, vật hoặc nơi chốn." : "Đọc cả câu để nhớ từ trong ngữ cảnh.",
    words: [word.word]
  };
};

export const createUsageExamples = (lessonWords: Word[]): UsageExample[] => {
  const examples = lessonWords.map((word, index) => exampleForWord(word, index));
  const words = new Set(lessonWords.map((word) => word.word));

  if (words.has("cat") && words.has("run")) {
    examples.unshift({
      title: "Ghép danh từ + động từ",
      sentence: "The cat can run.",
      meaning: "Con mèo có thể chạy.",
      note: "cat là danh từ, run là động từ. Hai từ ghép thành một câu có nghĩa.",
      words: ["cat", "run"]
    });
  }
  if (words.has("red") && words.has("apple")) {
    examples.unshift({
      title: "Tính từ đứng trước danh từ",
      sentence: "I eat a red apple.",
      meaning: "Con ăn một quả táo đỏ.",
      note: "red đứng trước apple để miêu tả màu của quả táo.",
      words: ["red", "apple"]
    });
  }

  return examples.slice(0, 10);
};
