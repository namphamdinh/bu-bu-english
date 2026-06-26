import { Link } from "react-router-dom";
import { BadgeCard } from "../components/BadgeCard";
import { Mascot } from "../components/Mascot";
import { ProgressBar } from "../components/ProgressBar";
import { useDailyLesson } from "../hooks/useDailyLesson";
import { useProgress } from "../hooks/useProgress";

const getLevel = (stars: number) => {
  if (stars >= 400) return "Tiny Champion";
  if (stars >= 250) return "English Hero";
  if (stars >= 120) return "Super Bư Bư";
  if (stars >= 40) return "Word Explorer";
  return "Little Star";
};

export const HomePage = () => {
  const { lesson } = useDailyLesson();
  const { progress, streak } = useProgress();
  return (
    <main className="home">
      <header className="hero">
        <div><span className="eyebrow">500 SINGLE WORDS</span><h1>Bư Bư English</h1>
          <p>Mỗi ngày 10 từ, Bư Bư giỏi tiếng Anh hơn một chút!</p>
          <ProgressBar value={lesson.learnedWordIds.length} max={10} label="Tiến độ hôm nay" />
        </div>
        <Mascot message={lesson.completed ? "Hôm nay Bư Bư hoàn thành nhiệm vụ rồi!" : "Mình học 10 từ nhé!"} />
      </header>
      <section className="stats-row">
        <BadgeCard icon="🔥" title="Ngày liên tiếp" value={streak} />
        <BadgeCard icon="⭐" title="Tổng số sao" value={progress.totalStars} />
        <BadgeCard icon="🏆" title="Cấp độ" value={getLevel(progress.totalStars)} />
      </section>
      <nav className="home-actions">
        <Link className="home-action primary" to="/lesson"><span>🚀</span><div><strong>Bắt đầu học hôm nay</strong><small>10 từ mới đang chờ Bư Bư</small></div></Link>
        <Link className="home-action" to="/review"><span>🧠</span><div><strong>Ôn lại từ khó</strong><small>Gặp lại những bạn từ chưa thuộc</small></div></Link>
        <Link className="home-action" to="/vocabulary"><span>📚</span><div><strong>Kho 500 từ đơn</strong><small>Tìm từ theo chủ đề</small></div></Link>
        <Link className="home-action" to="/mind-map"><span>🫧</span><div><strong>Bản đồ chủ đề</strong><small>Khám phá các nhóm từ</small></div></Link>
        <Link className="home-action" to="/parents"><span>👪</span><div><strong>Góc phụ huynh</strong><small>Xem tiến độ của bé</small></div></Link>
      </nav>
    </main>
  );
};
