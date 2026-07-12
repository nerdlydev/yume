import { z } from 'zod';

export const createCommunitySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').max(50),
  description: z.string().max(255).optional(),
});
