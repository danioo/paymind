import { RecurringPaymentForm } from '@/components/RecurringPaymentForm/RecurringPaymentForm';

export default async function Edit({ params }: { params: { id: string } }) {
  console.log(params);

  return <RecurringPaymentForm recurringPayment={null} />;
}
