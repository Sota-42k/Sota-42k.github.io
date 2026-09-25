import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    /** Ordered author list, each formatted "Last, F." — see AUTHOR_SELF. */
    authors: z.array(z.string()).nonempty(),
    year: z.number().int(),
    venue: z.string(),
    status: z.enum(['peer-reviewed', 'under-review', 'preprint']),
    links: z
      .object({
        pdf: z.url().optional(),
        arxiv: z.url().optional(),
        doi: z.url().optional(),
        code: z.url().optional(),
      })
      .optional(),
    /** Manual tiebreak within a year; lower sorts first. */
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    institution: z.string(),
    role: z.string(),
    advisor: z.string().optional(),
    start: z.coerce.date(),
    /** Omit for ongoing work; rendered as "Present". */
    end: z.coerce.date().optional(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { publications, research };
