import { useQuery } from '@tanstack/react-query';
import { orpc } from '@/lib/orpc';

export const useTransactions = () => {
  const { data: transactions = [], ...rest } = useQuery(orpc.transaction.list.queryOptions());

  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((sum, amount) => sum + amount, 0).toFixed(2);

  return { transactions, amounts, total, ...rest };
};
