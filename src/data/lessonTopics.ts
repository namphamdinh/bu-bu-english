import type { Word, WordCategory } from "../types/word";

export type LessonTopic = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  categories?: WordCategory[];
  words?: string[];
};

export const LESSON_TOPICS: LessonTopic[] = [
  { id: "all", label: "Tất cả chủ đề", emoji: "🌈", description: "App tự chọn từ mới, từ khó và từ cần ôn." },
  { id: "sports", label: "Thể thao", emoji: "⚽", description: "Bóng, vận động, chạy nhảy.", words: ["football", "ball", "run", "jump", "swim", "ride", "bike", "walk", "play", "scooter", "skateboard", "rope"] },
  { id: "family", label: "Gia đình", emoji: "👨‍👩‍👧‍👦", description: "Ông bà, bố mẹ, anh chị em.", categories: ["Family"] },
  { id: "school", label: "Lớp học", emoji: "🏫", description: "Trường lớp, đồ dùng học tập.", categories: ["School"] },
  { id: "fruits", label: "Hoa quả", emoji: "🍎", description: "Trái cây quen thuộc.", words: ["apple", "banana", "pear", "grape", "mango", "watermelon", "lemon", "peach", "cherry", "strawberry"] },
  { id: "animals", label: "Con vật", emoji: "🐱", description: "Các bạn động vật.", categories: ["Animals"] },
  { id: "food", label: "Đồ ăn", emoji: "🍚", description: "Món ăn, đồ uống hằng ngày.", categories: ["Food"] },
  { id: "colors", label: "Màu sắc", emoji: "🎨", description: "Các màu cơ bản.", categories: ["Colors"] },
  { id: "body", label: "Cơ thể", emoji: "✋", description: "Mắt, tay, chân, khuôn mặt.", categories: ["Body"] },
  { id: "house", label: "Trong nhà", emoji: "🏠", description: "Đồ vật và phòng trong nhà.", categories: ["House"] },
  { id: "actions", label: "Hành động", emoji: "🏃", description: "Chạy, nhảy, đọc, viết.", categories: ["Actions"] },
  { id: "feelings", label: "Cảm xúc", emoji: "😊", description: "Vui, buồn, sợ, tự hào.", categories: ["Feelings"] },
  { id: "nature", label: "Thiên nhiên", emoji: "🌳", description: "Cây, hoa, trời, biển.", categories: ["Nature", "Weather"] },
  { id: "vehicles", label: "Xe cộ", emoji: "🚗", description: "Xe, tàu, máy bay.", categories: ["Vehicles"] },
  { id: "places", label: "Nơi chốn", emoji: "🏞️", description: "Công viên, trường, thành phố.", categories: ["Places"] }
];

export const getLessonTopic = (id?: string) =>
  LESSON_TOPICS.find((topic) => topic.id === id) ?? LESSON_TOPICS[0];

export const getWordsForLessonTopic = (allWords: Word[], topicId?: string): Word[] => {
  const topic = getLessonTopic(topicId);
  if (topic.id === "all") return allWords;

  const wordSet = new Set((topic.words ?? []).map((word) => word.toLowerCase()));
  const categorySet = new Set(topic.categories ?? []);
  return allWords.filter((word) =>
    wordSet.has(word.word.toLowerCase()) || categorySet.has(word.category)
  );
};
