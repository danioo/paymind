'use client';

import { RecurringPaymentForm } from '@/components/RecurringPaymentForm/RecurringPaymentForm';
import { Modal } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function RecurringPaymentEditModal() {
  const router = useRouter();

  return (
    <Modal opened={true} onClose={() => router.back()}>
      <RecurringPaymentForm recurringPayment={null} />
    </Modal>
  );
}
