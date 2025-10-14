import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";

export const useTransactions = () => {
  const { data: transactions = [], ...rest } = useQuery(orpc.transaction.getAll.queryOptions());

  const amounts = transactions.map(transaction => transaction.amount)
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

  return { transactions, amounts, total, ...rest };
}
