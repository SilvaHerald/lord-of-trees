import type { postSchema } from '@schemas/post.schema';
import type { z } from 'astro:content';

export type BlogType = z.infer<typeof postSchema>;
