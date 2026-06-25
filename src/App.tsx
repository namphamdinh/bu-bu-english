import { NavLink, Route, Routes } from "react-router-dom";
import { DailyLessonPage } from "./pages/DailyLessonPage";
import { HomePage } from "./pages/HomePage";
import { MindMapPage } from "./pages/MindMapPage";
import { ParentStatsPage } from "./pages/ParentStatsPage";
import { QuizPage } from "./pages/QuizPage";
import { ResultPage } from "./pages/ResultPage";
import { ReviewPage } from "./pages/ReviewPage";
import { VocabularyPage } from "./pages/VocabularyPage";
import { WordDetailPage } from "./pages/WordDetailPage";

export default function App() {
  return <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lesson" element={<DailyLessonPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/vocabulary" element={<VocabularyPage />} />
      <Route path="/word/:id" element={<WordDetailPage />} />
      <Route path="/parents" element={<ParentStatsPage />} />
      <Route path="/mind-map" element={<MindMapPage />} />
    </Routes>
    <nav className="bottom-nav">
      <NavLink to="/">🏠<span>Trang chủ</span></NavLink>
      <NavLink to="/lesson">⭐<span>Học</span></NavLink>
      <NavLink to="/review">🧠<span>Ôn tập</span></NavLink>
      <NavLink to="/vocabulary">📚<span>Kho từ</span></NavLink>
    </nav>
  </>;
}
