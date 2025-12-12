import z from 'zod';

export const TransactionRequestSchema = z.object({
  text: z.string().min(1, 'Please add some Item').trim(),
  amount: z.string().min(1, 'Please add some amount').trim(),
});

export const TransactionResponseSchema = z.object({
  id: z.number().int(),
  text: z.string(),
  amount: z.number(),
  createdAt: z.date(), // ISO string from Java LocalDateTime
});

export const TransactionSchema = TransactionResponseSchema; // same shape as DB entity

// Optional: for partial updates (PATCH)
export const TransactionUpdateSchema = TransactionRequestSchema.partial();

// Helpful types for TypeScript
export type TransactionRequest = z.infer<typeof TransactionRequestSchema>;
export type TransactionResponse = z.infer<typeof TransactionResponseSchema>;
export type Transaction = TransactionResponse;
export type TransactionUpdate = z.infer<typeof TransactionUpdateSchema>;
