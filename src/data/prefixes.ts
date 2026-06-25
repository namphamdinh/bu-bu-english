export type Affix = { value: string; meaning: string; examples: string[]; tip: string };
export const prefixes: Affix[] = [
  { value: "anti-", meaning: "chống lại", examples: ["antivirus: chống vi-rút"], tip: "anti giống một chiếc khiên bảo vệ." },
  { value: "re-", meaning: "làm lại", examples: ["redo: làm lại", "reread: đọc lại"], tip: "re- là quay lại làm thêm lần nữa." },
  { value: "un-", meaning: "không, ngược lại", examples: ["unhappy: không vui", "unlock: mở khóa"], tip: "un- thường lật ngược ý của từ." },
  { value: "pre-", meaning: "trước", examples: ["preschool: trường mầm non"], tip: "pre- là điều đến trước." },
  { value: "mis-", meaning: "sai", examples: ["misread: đọc sai"], tip: "mis- báo hiệu một việc chưa đúng." },
  { value: "dis-", meaning: "không, trái nghĩa", examples: ["dislike: không thích"], tip: "dis- giúp đổi nghĩa của từ." }
];
