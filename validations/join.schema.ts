import { z } from 'zod';

export const joinSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, 'Username must have at least 2 characters')
    .max(20, 'Username can have max 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Use only letters, numbers, _ or -'),
});

export type JoinFormValues = z.infer<typeof joinSchema>;
