import { AddTransaction } from '@/components/add-transaction';
import { Balance } from '@/components/balance';
import { IncomeExpenses } from '@/components/income-expensenses';
import { TransactionList } from '@/components/transaction-list';

export default function Home() {
  return (
    <div className="mx-auto w-87.5 flex flex-col justify-center pb-5">
      <Balance />
      <IncomeExpenses />
      <TransactionList />
      <AddTransaction />
    </div>
  );
}
