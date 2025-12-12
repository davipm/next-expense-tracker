import { ORPCError } from '@orpc/server';
import z from 'zod';
import { publicProcedure } from '@/server/orpc';
import { prisma } from '@/server/prisma';
import {
  TransactionRequestSchema,
  TransactionResponseSchema,
} from '@/server/schemas/transaction.schema';

export const transactionRouter = {
  list: publicProcedure
    .route({ method: 'GET', path: '/transactions' })
    .output(z.array(TransactionResponseSchema))
    .handler(() => {
      return prisma.transaction.findMany();
    }),

  create: publicProcedure
    .route({ method: 'POST', path: '/transactions' })
    .input(TransactionRequestSchema)
    .output(TransactionResponseSchema)
    .handler(({ input }) => {
      return prisma.transaction.create({
        data: {
          text: input.text,
          amount: Number(input.amount),
        },
      });
    }),

  delete: publicProcedure
    .route({ method: 'DELETE', path: '/transactions/{id}' })
    .input(z.object({ id: z.number() }))
    .output(TransactionResponseSchema)
    .handler(async ({ input }) => {
      const transaction = await prisma.transaction.findUnique({
        where: { id: input.id },
      });

      if (!transaction) {
        throw new ORPCError('NOT_FOUND', {
          message: `Transaction with ID ${input.id} not found`,
        });
      }

      return prisma.transaction.delete({
        where: { id: input.id },
      });
    }),
};
