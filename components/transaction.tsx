'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { numberWithCommas } from '@/lib/utils';
import { orpc } from '@/utils/orpc';

type Props = {
  id: number;
  text: string;
  amount: number;
  createAt?: Date;
};

export function Transaction({ id, text, amount }: Props) {
  const queryClient = useQueryClient();

  const { mutate: deleteTransaction, isPending } = useMutation(
    orpc.transaction.delete.mutationOptions({
      onMutate: async () => {
        await queryClient.cancelQueries({
          queryKey: orpc.transaction.key({ type: 'query' }),
        });

        const previousTransactions = queryClient.getQueriesData({
          queryKey: orpc.transaction.key({ type: 'query' }),
        });

        queryClient.setQueriesData(
          { queryKey: orpc.transaction.key({ type: 'query' }) },
          (old: { id: number }[]) => {
            return old.filter((transaction) => transaction.id !== id);
          },
        );

        return { previousTransactions };
      },
      onError: (err, variables, context) => {
        queryClient.setQueriesData(
          { queryKey: orpc.transaction.key({ type: 'query' }) },
          context?.previousTransactions,
        );
      },
      onSuccess: async () => {
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
