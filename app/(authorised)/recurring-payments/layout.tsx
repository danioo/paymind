import { Box, Group } from '@mantine/core';
import RecurringPaymentButton from '@/components/RecurringPaymentButton/RecurringPaymentButton';

export default function RecurringPaymentsLayout({
  paymentForm,
  children,
}: {
  paymentForm: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <Box p={10}>
        <Group justify="flex-end">
          <RecurringPaymentButton />
        </Group>
      </Box>

      <div>{paymentForm}</div>

      <div>{children}</div>
    </>
  );
}
