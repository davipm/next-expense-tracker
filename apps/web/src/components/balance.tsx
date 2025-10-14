import { numberWithCommas } from "@/lib/utils";
import {useTransactions} from "@/hooks/use-transactions";

export default function Balance() {
  const { total } = useTransactions()

  return (
    <>
      <h4>Your Balance</h4>
      <h1>${numberWithCommas(total)}</h1>
    </>
  )
}
