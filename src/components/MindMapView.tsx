import { Link } from "react-router-dom";
import { WORD_CATEGORIES } from "../types/word";
import { words } from "../data/words";

export const MindMapView = () => (
  <div className="mind-map">
    {WORD_CATEGORIES.map((category) => (
      <Link key={category} to={`/vocabulary?category=${encodeURIComponent(category)}`} className="mind-bubble">
        <strong>{category}</strong>
        <span>{words.filter((w) => w.category === category).slice(0, 5).map((w) => w.emoji).join(" ")}</span>
      </Link>
    ))}
  </div>
);
