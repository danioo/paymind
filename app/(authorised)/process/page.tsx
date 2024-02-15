import { FileUpload } from '@/components/FileUpload/FileUpload';
import PostHogClient from '@/utils/posthog-client';
import { getServerClient } from '@/utils/supabase-server';
import { Container } from '@mantine/core';
import { redirect } from 'next/navigation';
import { Client, product } from 'mindee';
import { Database } from '@/types/schema.gen';

export default async function Process() {
  const processFile = async (data: FormData) => {
    'use server';

    const mindeeClient = new Client({
      apiKey: 'aca7d99c65e2834f1ace2f0f9de2ef63',
    });
    const file = data.get('file') as File;
    const fileArrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileArrayBuffer);
    const base64String = buffer.toString('base64');
    const inputSource = mindeeClient.docFromBase64(base64String, file.name);
    const apiResponse = await mindeeClient.parse(
      product.InvoiceV4,
      inputSource,
    );

    // save to db
    const dueDate = apiResponse.document.inference.prediction.dueDate.value;
    const totalAmount =
      apiResponse.document.inference.prediction.totalAmount.value;
    const invoiceNumber =
      apiResponse.document.inference.prediction.invoiceNumber.value;
    const supplierName =
      apiResponse.document.inference.prediction.supplierName.value;

    const supabase = getServerClient();
    const posthogClient = PostHogClient();

    const user = await supabase.auth.getUser();
    const isFeatureEnabled = await posthogClient.isFeatureEnabled(
      'invoice-details-form',
      user.data.user?.id ?? 'undefined-user',
    );

    await posthogClient.shutdownAsync();

    if (isFeatureEnabled) {
      const { data: invoice, error } = await supabase
        .from('invoices')
        .insert({
          supplier_name: supplierName,
          invoice_number: invoiceNumber,
          due_date: dueDate,
          invoice_amount: totalAmount,
          user_id: user.data.user?.id,
        } as Database['public']['Tables']['invoices']['Insert'])
        .select('id')
        .single();

      console.log('error', error);

      if (invoice?.id) {
        redirect(`/invoices/${invoice.id}/edit`);
      } else {
        redirect('/invoices');
      }
    } else {
      await supabase.from('invoices').insert({
        due_date: dueDate,
        invoice_amount: totalAmount,
        user_id: user.data.user?.id,
      } as Database['public']['Tables']['invoices']['Insert']);

      redirect('/invoices');
    }
  };

  return (
    <Container size="lg">
      <form action={processFile}>
        <FileUpload />
      </form>
    </Container>
  );
}
