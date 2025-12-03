import type { z } from "astro:content";
import type { blogSchema } from "@schemas/blog.schema";

export type BlogType = z.infer<typeof blogSchema>
