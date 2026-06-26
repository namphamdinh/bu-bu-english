export const Mascot = ({ message, compact = false }: { message?: string; compact?: boolean }) => (
  <div className={`mascot ${compact ? "mascot--compact" : ""}`}>
    <img src="./bubu.png" alt="Bư Bư đang học tiếng Anh" />
    {message && <div className="mascot__bubble">{message}</div>}
  </div>
);
