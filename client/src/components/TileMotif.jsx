// SukiMart's cement-tile motif, drawn once and cropped two ways:
// "full" shows the whole four-fold pattern (one tile per screen only),
// "corner" crops to the top-right quarter that marks every other tile.
export default function TileMotif({ variant = 'full', className = '', size }) {
  const viewBox = variant === 'corner' ? '120 0 80 80' : '0 0 200 200';
  return (
    <svg
      className={`motif motif-${variant} ${className}`}
      viewBox={viewBox}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="200" height="200" fill="var(--tile)" />
      {/* corner quarter-discs and their slate arcs */}
      {[[0, 0], [200, 0], [0, 200], [200, 200]].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="44" fill="var(--ochre)" />
          <circle cx={cx} cy={cy} r="60" fill="none" stroke="var(--slate)" strokeWidth="6" />
        </g>
      ))}
      {/* centre medallion */}
      <circle cx="100" cy="100" r="58" fill="none" stroke="var(--ox)" strokeWidth="6" />
      <path d="M100 50 L150 100 L100 150 L50 100 Z" fill="var(--ox)" />
      <path d="M100 74 L126 100 L100 126 L74 100 Z" fill="var(--tile)" />
      <circle cx="100" cy="100" r="12" fill="var(--ochre)" />
      {/* petals pointing to the tile edges */}
      {[[100, 18], [182, 100], [100, 182], [18, 100]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="var(--slate)" />
      ))}
    </svg>
  );
}
