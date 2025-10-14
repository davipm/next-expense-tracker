import { numberWithCommas } from "@/lib/utils";
import { useTransactions } from "@/hooks/use-transactions";

export function IncomeExpenses() {
  const { amounts } = useTransactions();

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <div className="flex justify-between my-5 p-5 bg-white shadow-md">
      <div className="flex-1 text-center first-of-type:border-r first-of-type:border-[#dedede]">
        <h4>Income</h4>
        <p className="mb-1 text-2xl tracking-wide text-[#2ecc71]">
          ${numberWithCommas(income)}
        </p>
      </div>
      <div className="flex-1 text-center">
        <h4>Expense</h4>
        <p className="mb-1 text-2xl tracking-wide text-[#c0392b]">
          ${numberWithCommas(expense)}
        </p>
      </div>
    </div>
  );
}
