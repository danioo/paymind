'use client';

import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function RecurringPaymentButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push('/recurring-payments/add')}>
      New payment
    </Button>
  );
}
