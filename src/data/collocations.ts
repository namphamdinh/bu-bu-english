export type Collocation = {
  phrase: string; meaning: string; example: string; exampleMeaning: string;
  wrongUsage?: string; tip: string;
};
export const collocations: Collocation[] = [
  ["drink water", "uống nước", "I drink water.", "Con uống nước.", "eat water", "Đồ uống đi với drink."],
  ["eat breakfast", "ăn sáng", "We eat breakfast.", "Chúng con ăn sáng.", "drink breakfast", "Bữa ăn đi với eat."],
  ["brush teeth", "đánh răng", "I brush my teeth.", "Con đánh răng.", "wash teeth", "Tiếng Anh dùng brush cho đánh răng."],
  ["go to school", "đi học", "I go to school.", "Con đi học.", undefined, "Nhớ cả cụm go to school."],
  ["play football", "chơi bóng đá", "We play football.", "Chúng con chơi bóng đá.", "do football", "Môn chơi có bóng thường đi với play."],
  ["read a book", "đọc sách", "She reads a book.", "Bạn ấy đọc sách.", undefined, "Read đi với book."],
  ["take a bath", "tắm", "I take a bath.", "Con đi tắm.", "make a bath", "Học cả cụm take a bath."],
  ["wash hands", "rửa tay", "Wash your hands.", "Hãy rửa tay.", "brush hands", "Hands đi với wash."],
  ["do homework", "làm bài tập", "I do my homework.", "Con làm bài tập.", "make homework", "Homework đi với do."],
  ["make a cake", "làm bánh", "Dad makes a cake.", "Bố làm một chiếc bánh.", "do a cake", "Tạo ra thứ gì thường dùng make."],
  ["ride a bike", "đi xe đạp", "I ride a bike.", "Con đi xe đạp.", "drive a bike", "Bike đi với ride."]
].map(([phrase, meaning, example, exampleMeaning, wrongUsage, tip]) => ({
  phrase, meaning, example, exampleMeaning, wrongUsage, tip
})) as Collocation[];
