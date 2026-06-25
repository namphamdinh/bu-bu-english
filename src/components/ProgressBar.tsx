export const ProgressBar = ({ value, max, label }: { value: number; max: number; label?: string }) => (
  <div className="progress-wrap">
    {label && <div className="progress-label"><span>{label}</span><strong>{value}/{max}</strong></div>}
    <div className="progress"><span style={{ width: `${Math.min(100, (value / Math.max(1, max)) * 100)}%` }} /></div>
  </div>
);
