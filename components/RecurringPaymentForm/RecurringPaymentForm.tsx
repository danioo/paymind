'use client';

import { TransformedValues, useForm } from '@mantine/form';
import { DatePickerInput, NumberInput, TextInput } from '../Inputs/Inputs';
import { Button, Checkbox, Group } from '@mantine/core';
import { getBrowserClient } from '@/utils/supabase-client';
import { useRouter } from 'next/navigation';
import { Database } from '@/types/schema.gen';

export function RecurringPaymentForm({
  recurringPayment,
}: {
  recurringPayment:
    | Database['public']['Tables']['recurring_payments']['Row']
    | null;
}) {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      id: recurringPayment?.id,
      supplier_name: recurringPayment?.supplier_name,
      amount: recurringPayment?.amount,
      date: recurringPayment?.date
        ? new Date(recurringPayment.date)
        : new Date(),
      paid: recurringPayment?.paid,
    },

    transformValues: (values) => ({
      ...values,
      date: new Date(values.date ?? ''),
    }),
  });

  const handleSubmit = async (values: TransformedValues<typeof form>) => {
    const supabase = getBrowserClient();

    if (recurringPayment === null) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { error: insertError } = await supabase
        .from('recurring_payments')
        .insert({
          supplier_name: values.supplier_name,
          amount: values.amount,
          date: values.date.toISOString(),
          paid: values.paid,
          user_id: user?.id,
        } as Database['public']['Tables']['recurring_payments']['Insert']);

      if (!insertError) {
        router.back();
      }
    } else {
      const { error: updateError } = await supabase
        .from('recurring_payments')
        .update({
          supplier_name: values.supplier_name,
          amount: values.amount,
          date: values.date?.toISOString(),
          paid: values.paid,
        } as Database['public']['Tables']['recurring_payments']['Update'])
        .eq('id', values.id ?? 0);

      if (!updateError) {
        router.back();
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Supplier" {...form.getInputProps('supplier_name')} />

      <NumberInput label="Amount" {...form.getInputProps('amount')} />

      <DatePickerInput
        label="Date"
        valueFormat="YYYY-MM-DD"
        {...form.getInputProps('date')}
      />

      <Checkbox
        label="Paid"
        {...form.getInputProps('paid', { type: 'checkbox' })}
      />

      <Group>
        <Button type="submit">Submit</Button>
        <Button variant="default" onClick={() => router.back()}>
          Cancel
        </Button>
      </Group>
    </form>
  );
}
