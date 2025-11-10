import { useMemo } from 'react';
import { useTransactions } from '@/hooks/use-transactions';
import { numberWithCommas } from '@/lib/utils';

export function IncomeExpenses() {
  const { amounts } = useTransactions();

  const { income, expense } = useMemo(() => {
    return amounts.reduce(
      (acc, amount) => {
        if (amount > 0) {
          acc.income += amount;
        } else {
          acc.expense += Math.abs(amount);
        }
        return acc;
      },
      { income: 0, expense: 0 },
    );
  }, [amounts]);

  return (
    <div className="flex justify-between my-5 p-5 border rounded-md border-gray-500 shadow-md">
      <div className="flex-1 text-center first-of-type:border-r first-of-type:border-[#dedede]">
        <h4 className="font-mono">Income</h4>
        <p className="mb-1 text-2xl tracking-wide text-[#2ecc71]">
          ${numberWithCommas(String(income))}
        </p>
      </div>
      <div className="flex-1 text-center">
        <h4 className="font-mono">Expense</h4>
        <p className="mb-1 text-2xl tracking-wide text-[#c0392b]">
          ${numberWithCommas(String(expense))}
        </p>
      </div>
    </div>
  );
}
