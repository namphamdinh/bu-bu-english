export const Mascot = ({ message, compact = false }: { message?: string; compact?: boolean }) => (
  <div className={`mascot ${compact ? "mascot--compact" : ""}`}>
    <img src="./assets/mascot.png" alt="Gấu Bư Bư đang học tiếng Anh" />
    {message && <div className="mascot__bubble">{message}</div>}
  </div>
);
