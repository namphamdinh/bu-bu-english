import type { Word } from "../types/word";
import { useSpeech } from "../hooks/useSpeech";
import { CollocationBox } from "./CollocationBox";
import { SpeakerButton } from "./SpeakerButton";

type Props = {
  word: Word;
  onRemember?: () => void;
  onDifficult?: () => void;
  onQuiz?: () => void;
};

export const WordCard = ({ word, onRemember, onDifficult, onQuiz }: Props) => {
  const { isSupported } = useSpeech();
  return <article className="word-card">
    <div className="word-card__hero">
      <span className="word-card__emoji">{word.emoji}</span>
      <div><span className="pill">{word.category}</span><h1>{word.word}</h1><h2>{word.meaning}</h2></div>
    </div>
    <section className="listen-box">
      <h3>🎧 Bư Bư nghe và đọc theo</h3>
      <strong className="listen-word">{word.word}</strong>
      <p><b>IPA:</b> {word.pronunciation} · <b>Đọc như:</b> {word.pronunciationText}</p>
      <div className="speaker-row"><SpeakerButton text={word.word} /><SpeakerButton text={word.word} slow /></div>
      <p>Con nghe cô đọc trước, rồi đọc theo 3 lần nhé!</p>
      {!isSupported && <p className="speech-fallback">Máy này chưa hỗ trợ đọc tiếng Anh tự động. Bư Bư vẫn có thể nhìn cách đọc và học bình thường nhé!</p>}
    </section>
    <details className="info-box" open>
      <summary>👄 Bư Bư đọc chuẩn hơn</summary>
      <dl className="word-details">
        <div><dt>IPA</dt><dd>{word.pronunciation}</dd></div>
        <div><dt>Đọc như</dt><dd>{word.pronunciationText}</dd></div>
        <div><dt>Mẹo miệng</dt><dd>{word.mouthTip}</dd></div>
        <div><dt>Đừng đọc sai</dt><dd>{word.commonMistake}</dd></div>
      </dl>
      <ol><li>Nghe cô đọc.</li><li>Bư Bư đọc theo.</li><li>Bấm “Con đã đọc xong”.</li></ol>
      <button className="button button--soft">🎙️ Con đã đọc xong</button>
    </details>
    <div className="example-card"><strong>{word.example}</strong><span>{word.exampleMeaning}</span><SpeakerButton text={word.example} /></div>
    <details className="info-box">
      <summary>💡 Hiểu và nhớ từ</summary>
      <p>{word.explanation}</p><p><strong>Mẹo nhớ:</strong> {word.memoryTip}</p>
    </details>
    <CollocationBox word={word.word} />
    <div className="action-grid">
      {onRemember && <button className="button button--success" onClick={onRemember}>✅ Con nhớ rồi</button>}
      {onDifficult && <button className="button button--accent" onClick={onDifficult}>🤔 Khó quá</button>}
      {onQuiz && <button className="button button--primary" onClick={onQuiz}>🎯 Làm quiz từ này</button>}
    </div>
  </article>;
};
