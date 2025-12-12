'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { numberWithCommas } from '@/lib/utils';
import type { Transaction as IProps } from '@/server/schemas/transaction.schema';
import { orpc } from '@/utils/orpc';

type Props = Omit<IProps, 'createdAt'>;

export function Transaction({ id, text, amount }: Props) {
  const queryClient = useQueryClient();

  const { mutate: deleteTransaction, isPending } = useMutation(
    orpc.transaction.delete.mutationOptions({
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({
          queryKey: orpc.transaction.key(),
        });

        const previousTransactions = queryClient.getQueryData(orpc.transaction.list.queryKey());

        queryClient.setQueryData(orpc.transaction.list.queryKey(), (old) => {
          if (!old) return old;
          return old.filter((transaction) => transaction.id !== id);
        });

        return { previousTransactions };
      },
      onSuccess: () => {
        toast.success('Transaction deleted successfully');
      },
      onError: (err, variables, context) => {
        toast.error(`${err.message} form Transaction ${variables.id}`);
        queryClient.setQueryData(orpc.transaction.list.queryKey(), context?.previousTransactions);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: orpc.transaction.key({ type: 'query' }),
        });
      },
    }),
  );

  return (
    <li className="flex font-bold text-lg dark:bg-gray-900 dark:text-white rounded-md font-mono justify-between items-center relative my-2.5 p-2.5 text-[#333] bg-white shadow-md">
      {text}{' '}
      <span className="hover:cursor-pointer">
        {amount < 0 ? '-' : '+'}${numberWithCommas(String(Math.abs(amount)))}
      </span>
      <Button
        variant="destructive"
        className="hover:cursor-pointer"
        disabled={isPending}
        onClick={() => deleteTransaction({ id })}
      >
        {isPending ? '...' : 'X'}
      </Button>
    </li>
  );
}
