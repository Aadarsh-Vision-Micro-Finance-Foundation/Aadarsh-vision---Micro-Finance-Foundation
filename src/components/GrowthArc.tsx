interface GrowthArcProps {
  className?: string;
  progress?: number; // 0-1, for partial arcs (e.g. process steps)
  variant?: 'full' | 'half';
}

/**
 * Signature visual motif derived from the golden arc in the Aadarsh Vision logo.
 * Used as a section divider, decorative backdrop, and progress indicator
 * throughout the site to encode the idea of "growth trajectory."
 */
const GrowthArc = ({ className = '', progress = 1, variant = 'full' }: GrowthArcProps) => {
  const circumference = variant === 'full' ? 660 : 330;
  const dashOffset = circumference * (1 - progress);

  return (
    <svg
      viewBox="0 0 240 140"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M 10 130 A 110 110 0 0 1 230 130"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M 10 130 A 110 110 0 0 1 230 130"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
      />
    </svg>
  );
};

export default GrowthArc;
