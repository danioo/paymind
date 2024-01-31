'use client';

import { InvoiceEditForm } from '../InvoiceEditForm/InvoiceEditForm';
import { Invoice } from '../InvoicesTable/InvoicesTable';
import { useCallback, useEffect, useState } from 'react';
import { getBrowserClient } from '@/utils/supabase-client';

export function InvoiceEdit({ id }: { id: string }) {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const supabase = getBrowserClient();

  const getInvoice = useCallback(
    async (id: string) => {
      const { data: invoice } = await supabase
        .from('invoices')
        .select()
        .eq('id', id)
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
