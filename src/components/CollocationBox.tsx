import { collocations } from "../data/collocations";

export const CollocationBox = ({ word }: { word: string }) => {
  const item = collocations.find((entry) => entry.phrase.includes(word));
  if (!item) return null;
  return (
    <div className="info-box">
      <strong>💬 Nói tự nhiên: {item.phrase}</strong>
      <p>{item.meaning}. {item.tip}</p>
      {item.wrongUsage && <small>Không nói: {item.wrongUsage}</small>}
    </div>
  );
};
