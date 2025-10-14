import type { Route } from "./+types/_index";
import Balance from "@/components/balance";
import { AddTransaction } from "@/components/add-transaction";
import { IncomeExpenses } from "@/components/income-expensenses";
import { TransactionList } from "@/components/transaction-list";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "react-node-expense-tracker" },
    {
      name: "description",
      content: "react-node-expense-tracker is a web application",
    },
  ];
}

export default function Home() {
  return (
    <div className="mx-8 w-[350px]">
      <Balance />
      <IncomeExpenses />
      <TransactionList />
      <AddTransaction />
    </div>
  );
}
