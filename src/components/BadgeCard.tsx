export const BadgeCard = ({ icon, title, value }: { icon: string; title: string; value: string | number }) => (
  <article className="stat-card"><span>{icon}</span><strong>{value}</strong><small>{title}</small></article>
);
