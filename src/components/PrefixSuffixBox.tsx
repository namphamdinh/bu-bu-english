import { prefixes } from "../data/prefixes";
import { suffixes } from "../data/suffixes";

export const PrefixSuffixBox = () => (
  <details className="info-box">
    <summary>🧩 Mẹo ghép đầu và đuôi từ</summary>
    <div className="affix-grid">
      {[...prefixes.slice(0, 3), ...suffixes.slice(0, 3)].map((item) => (
        <div key={item.value}><strong>{item.value}</strong>: {item.meaning}<small>{item.examples[0]}</small></div>
      ))}
    </div>
  </details>
);
