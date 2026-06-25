# Bư Bư English – 500 First Words

PWA học tiếng Anh dành cho trẻ 5–8 tuổi. Mỗi ngày app chọn 10 từ bằng cơ chế ngẫu nhiên có trọng số, ưu tiên từ chưa học, từ khó và từ bé hay trả lời sai. Toàn bộ dữ liệu được lưu trên thiết bị, không cần backend hoặc tài khoản.

## Tính năng chính

- 500 từ thuộc 20 chủ đề, có nghĩa tiếng Việt, IPA, cách đọc gần đúng, mẹo khẩu hình, lỗi thường gặp, câu ví dụ và mẹo nhớ.
- Một danh sách cố định gồm 10 từ cho mỗi ngày; mở lại app trong ngày không đổi bài.
- Sau 10 từ có phần **Cách dùng từ hôm nay**, gồm câu ngắn phù hợp trẻ nhỏ và nút nghe.
- 7 dạng quiz, 4 đáp án/câu, không hỏi lại một từ trong bài hằng ngày.
- Spaced repetition ưu tiên từ khó, từ sai nhiều và mastery thấp.
- Kho từ có tìm kiếm, lọc chủ đề và trạng thái.
- Ôn 10 từ khó nhất, từ hôm qua hoặc từ chưa thuộc.
- Web Speech API, thống kê phụ huynh, streak, sao, level, badge.
- PWA cơ bản, responsive mobile-first, hoạt động offline sau lần tải đầu.

## Chạy trên máy

Yêu cầu Node.js 20 trở lên.

```bash
npm install
npm run dev
```

Mở địa chỉ Vite in ra trong terminal.

## Build và preview

```bash
npm run build
npm run preview
```

Thư mục thành phẩm là `dist/`.

## Deploy GitHub Pages

Project dùng `HashRouter` và `base: "./"` nên không cần cấu hình rewrite.

1. Tạo repository GitHub và push source code.
2. Chạy `npm run build`.
3. Có thể deploy bằng package `gh-pages`:

```bash
npm install --save-dev gh-pages
npx gh-pages -d dist
```

4. Trong GitHub, vào **Settings → Pages**, chọn branch `gh-pages`.

Cũng có thể dùng GitHub Actions để chạy `npm ci && npm run build` rồi upload thư mục `dist`.

## Sửa hoặc thêm từ

Dữ liệu nằm tại `src/data/words.ts`. Mỗi dòng seed có dạng:

```text
apple|quả táo|🍎|/ˈæp.əl/|AP-uhl
```

Hàm `makeWords` bổ sung các trường hướng dẫn, ví dụ và mẹo nhớ theo cấu trúc `Word`. Khi cần nội dung riêng sâu hơn cho một từ, có thể thêm một lớp override sau khi tạo mảng category.

App hiện giữ đúng 500 từ. Nếu thêm từ mới, nên kiểm tra lại số lượng và cân đối 20 chủ đề.

## Dữ liệu localStorage

Key chính: `bu-bu-english-progress-v1`.

Dữ liệu gồm:

- tiến độ từng từ: số lần gặp, đúng, sai, đánh dấu khó, mastery 0–5;
- danh sách 10 từ đã sinh theo từng ngày;
- trạng thái quiz và question ID đã hỏi;
- tổng sao, badge và các ngày đã học.

Nếu JSON cũ hỏng hoặc localStorage bị chặn, app dùng dữ liệu rỗng an toàn. Nút reset có xác nhận nằm trong **Góc phụ huynh**.

## Cấu trúc chính

```text
src/
  components/   UI tái sử dụng
  data/         500 từ, prefix, suffix, collocation
  hooks/        bài hằng ngày, storage, speech, progress
  pages/        các màn hình
  types/        kiểu TypeScript
  utils/        ngày, quiz, weighted random, spaced repetition
```

## Hướng phát triển tiếp

- Speech Recognition để chấm phát âm.
- Tài khoản và dashboard phụ huynh.
- Đồng bộ cloud giữa nhiều thiết bị.
- Xuất báo cáo PDF.
- Đóng gói Android/iOS bằng Capacitor.
- Viết nội dung phát âm thủ công sâu hơn cho từng từ và thu âm giọng giáo viên.

## Phát âm tiếng Anh

App sử dụng **Web Speech API** tích hợp sẵn trong trình duyệt, cụ thể là `window.speechSynthesis`. Tính năng này miễn phí, chạy trực tiếp trên thiết bị, không cần API key, tài khoản bên thứ ba hoặc backend. Bản đầu không dùng OpenAI API, Google API, Azure API hay dịch vụ phát âm trả phí.

App ưu tiên giọng `en-US`, sau đó lần lượt dùng `en-GB`, một giọng tiếng Anh bất kỳ và cuối cùng là giọng mặc định của trình duyệt. Tốc độ thường là `0.85`, tốc độ chậm là `0.65`; pitch và volume đều là `1`.

Chất lượng giọng đọc phụ thuộc thiết bị và trình duyệt. Chrome, Edge và Safari thường hỗ trợ tốt hơn. Nếu trình duyệt không hỗ trợ `speechSynthesis`, app vẫn hoạt động bình thường và hiển thị hướng dẫn đọc bằng chữ.
