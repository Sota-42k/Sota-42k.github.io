import type { CollectionEntry } from 'astro:content';

/**
 * Reverse-chronological. Year alone leaves same-year papers tied, so `order`
 * breaks the tie manually (lower sorts first) — it lets a main-conference paper
 * outrank a workshop paper from the same year. Title is the final tiebreak so
 * the build output stays deterministic.
 */
export function sortPublications(
  entries: CollectionEntry<'publications'>[]
): CollectionEntry<'publications'>[] {
  return [...entries].sort(
    (a, b) =>
      b.data.year - a.data.year ||
      a.data.order - b.data.order ||
      a.data.title.localeCompare(b.data.title)
  );
}
