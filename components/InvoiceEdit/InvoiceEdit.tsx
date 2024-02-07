'use client';

import { useCallback, useEffect, useState } from 'react';
import { getBrowserClient } from '@/utils/supabase-client';
import { InvoiceEditForm } from '../InvoiceEditForm/InvoiceEditForm';
import { Database } from '@/types/schema.gen';

export function InvoiceEdit({ id }: { id: string }) {
  const [invoice, setInvoice] = useState<
    Database['public']['Tables']['invoices']['Row'] | null
  >(null);
  const supabase = getBrowserClient();

  const getInvoice = useCallback(
    async (id: string) => {
      const { data: invoice } = await supabase
        .from('invoices')
        .select()
        .eq('id', id)
        .limit(1)
        .single();

      setInvoice(invoice);
    },
    [supabase],
  );

  useEffect(() => {
    getInvoice(id);
  }, [id, getInvoice]);

  return invoice && <InvoiceEditForm invoice={invoice} />;
}
