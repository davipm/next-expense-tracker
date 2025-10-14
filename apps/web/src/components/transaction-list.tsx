import { useTransactions } from "@/hooks/use-transactions";
import { Transaction } from "@/components/transaction";

export function TransactionList() {
  const { transactions } = useTransactions();

  return (
    <>
      <h3>History</h3>
      <ul className="mb-10 p-0 list-none">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} {...transaction} />
        ))}
      </ul>
    </>
  );
}
