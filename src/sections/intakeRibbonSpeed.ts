const DEFAULT_MARQUEE_DURATION_SECONDS = 35;
const MIN_MARQUEE_DURATION_SECONDS = 10;
const MAX_MARQUEE_DURATION_SECONDS = 120;

export function getMarqueeAnimationDuration(durationSeconds?: number): string {
  if (!Number.isFinite(durationSeconds)) {
    return `${DEFAULT_MARQUEE_DURATION_SECONDS}s`;
  }

  const safeDuration = Math.min(
    MAX_MARQUEE_DURATION_SECONDS,
    Math.max(MIN_MARQUEE_DURATION_SECONDS, durationSeconds as number),
  );

  return `${safeDuration}s`;
}
