import { ORPCError } from '@orpc/server';
import z from 'zod';
import { publicProcedure } from '@/server/orpc';
import { prisma } from '@/server/prisma';

export const transactionSchema = z.object({
  id: z.number().min(1),
  text: z.string().min(1),
  amount: z.number().min(1),
  createAt: z.date(),
});

export const transactionRouter = {
  getAll: publicProcedure
    .route({ method: 'GET', path: '/transactions' })
    .output(z.array(transactionSchema))
    .handler(() => {
      return prisma.transaction.findMany();
    }),

  create: publicProcedure
    .route({ method: 'POST', path: '/transactions' })
    .input(transactionSchema.omit({ id: true, createAt: true }))
    .output(transactionSchema)
    .handler(({ input }) => {
      return prisma.transaction.create({
        data: {
          text: input.text,
          amount: input.amount,
        },
      });
    }),

  delete: publicProcedure
    .route({ method: 'DELETE', path: '/transactions/{id}' })
    .input(z.object({ id: z.number() }))
    .output(transactionSchema)
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
