import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    credentials: z.string().optional(),
    skills: z.array(z.string()).min(1),
    headshotAccent: z.string().default('#2563eb'),
    initials: z.string().length(2),
    order: z.number().default(0),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    deliverables: z.array(z.string()).min(1),
    icon: z.enum(['bolt', 'database', 'network', 'compass']),
    order: z.number().default(0),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/caseStudies' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    industry: z.string(),
    summary: z.string(),
    stack: z.array(z.string()).min(1),
    metrics: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .min(1),
    durationWeeks: z.number().int().positive().optional(),
    order: z.number().default(0),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    author: z.enum(['schoenherr', 'weber', 'reichert']),
    category: z.enum(['opinion', 'guide']).default('opinion'),
    display: z.enum(['article', 'poster']).default('article'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const aiScenarios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/aiScenarios' }),
  schema: z.object({
    title: z.string(),
    context: z.string(),
    /** red | yellow | green — stored for authors, not shown on the public page */
    classification: z.enum(['red', 'yellow', 'green']),
    order: z.number().default(0),
  }),
});

export const collections = { team, services, caseStudies, insights, aiScenarios };
