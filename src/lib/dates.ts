/**
 * Date helpers for research entries.
 *
 * Frontmatter dates are parsed as UTC midnight, so formatting must also use UTC —
 * otherwise a date like 2026-08-01 renders as July in negative-offset timezones.
 */

const MONTH_YEAR = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "Aug 2026" — for display. */
export function formatMonthYear(date: Date): string {
  return MONTH_YEAR.format(date);
}

/** "2026-08" — for the datetime attribute of a <time> element. */
export function isoMonth(date: Date): string {
  return date.toISOString().slice(0, 7);
}
