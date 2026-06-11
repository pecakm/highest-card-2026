import { z } from 'zod';

export const joinSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, 'validation.usernameMin')
    .max(20, 'validation.usernameMax')
    .regex(/^[a-zA-Z0-9_-]+$/, 'validation.usernamePattern'),
});

export type JoinFormValues = z.infer<typeof joinSchema>;
