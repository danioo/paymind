'use client';

import { TransformedValues, useForm } from '@mantine/form';
import { DatePickerInput, NumberInput, TextInput } from '../Inputs/Inputs';
import { Button, Checkbox, Group } from '@mantine/core';
import { getBrowserClient } from '@/utils/supabase-client';
import { useRouter } from 'next/navigation';
import { Database } from '@/types/schema.gen';

export function InvoiceEditForm({
  invoice,
}: {
  invoice: Database['public']['Tables']['invoices']['Row'];
}) {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      id: invoice.id,
      supplier_name: invoice.supplier_name,
      invoice_number: invoice.invoice_number,
      invoice_amount: invoice.invoice_amount,
      due_date: invoice?.due_date ? new Date(invoice.due_date) : new Date(),
      notifications_on: invoice.notifications_on,
    },

    transformValues: (values) => ({
      ...values,
      due_date: new Date(values.due_date ?? ''),
    }),
  });

  const handleSubmit = async (values: TransformedValues<typeof form>) => {
    const supabase = getBrowserClient();
    const { error } = await supabase
      .from('invoices')
      .update({
        supplier_name: values.supplier_name,
        invoice_number: values.invoice_number,
        invoice_amount: values.invoice_amount,
        due_date: values.due_date?.toISOString(),
        notifications_on: values.notifications_on,
      } as Database['public']['Tables']['invoices']['Update'])
      .eq('id', values.id ?? 0);

    if (!error) {
      router.push('/invoices');
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Invoice Supplier"
        {...form.getInputProps('supplier_name')}
      />

      <TextInput
        label="Invoice Number"
        {...form.getInputProps('invoice_number')}
      />

      <NumberInput
        label="Invoice Amount"
        {...form.getInputProps('invoice_amount')}
      />

      <DatePickerInput
        label="Due Date"
        valueFormat="YYYY-MM-DD"
        {...form.getInputProps('due_date')}
      />

      <Checkbox
        label="Notifications On"
        {...form.getInputProps('notifications_on', { type: 'checkbox' })}
      />

      <Group>
        <Button type="submit">Submit</Button>
        <Button variant="default" onClick={() => router.push('/invoices')}>
          Cancel
        </Button>
      </Group>
    </form>
  );
}
