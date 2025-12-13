'use client';

import { useTransactions } from '@/hooks/use-transactions';
import { numberWithCommas } from '@/lib/utils';

export function Balance() {
  const { total } = useTransactions();

  return (
    <>
      <h4>Your Balance</h4>
      <h1>${numberWithCommas(total)}</h1>
    </>
  );
}
