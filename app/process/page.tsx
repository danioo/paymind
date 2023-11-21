import { FileUpload } from '@/components/FileUpload/FileUpload';
import PostHogClient from '@/utils/posthog-client';
import { getServerClient } from '@/utils/supabase-server';
import {
  ArrayPrediction,
  Client,
  ClientCredentials,
  Prediction,
} from '@lucidtech/las-sdk-node';
import { Container } from '@mantine/core';
import { redirect } from 'next/navigation';

export default async function Process() {
  const processFile = async (data: FormData) => {
    'use server';

    const client = new Client(
      new ClientCredentials(
        'https://api.lucidtech.ai/v1',
        '2c1724vghlv7haik1kha1lk06p',
        'bp1nvs07meaaoibmp3o00qce74n0m3gas0dpllr82mattkchstv',
        'auth.lucidtech.ai',
      ),
    );

    const file = data.get('file') as File;
    const fileArrayBuffer = await file.arrayBuffer();
    const document = await client.createDocument(
      fileArrayBuffer,
      'application/pdf',
    );
    const response = await client.createPrediction(
      document.documentId,
      'las:model:b9db0ed1a40e4ef4b2fa819c8fbfe2cd',
    );

    // save to db
    // const buffer = Buffer.from(fileArrayBuffer);
    // const base64String = buffer.toString('base64');
    const dueDate = response.predictions
      .filter((prediction) => prediction.label == 'due_date')
      .sort(
        (
          a: ArrayPrediction | Prediction,
          b: ArrayPrediction | Prediction,
        ): number => {
          const aValue = a?.value ?? 0;
          const bValue = b?.value ?? 0;

          if (aValue > bValue) {
            return aValue as number;
          } else {
            return bValue as number;
          }
        },
      )?.[0]?.value;
    const totalAmount = response.predictions
      .filter((prediction) => prediction.label == 'total_amount')
      .sort(
        (
          a: ArrayPrediction | Prediction,
          b: ArrayPrediction | Prediction,
        ): number => {
          const aValue = a?.value ?? 0;
          const bValue = b?.value ?? 0;

          if (aValue > bValue) {
            return aValue as number;
          } else {
            return bValue as number;
          }
        },
      )?.[0]?.value;

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
          due_date: dueDate,
          invoice_amount: totalAmount,
          // file_base64: base64String,
          user_id: user.data.user?.id,
        })
        .select('id')
        .single();

      console.log('error', error);

      if (invoice?.id) {
        redirect(`/invoices/${invoice.id}`);
      } else {
        redirect('/invoices');
      }
    } else {
      await supabase.from('invoices').insert({
        due_date: dueDate,
        invoice_amount: totalAmount,
        // file_base64: base64String,
        user_id: user.data.user?.id,
      });

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
