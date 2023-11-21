import {
  Table,
  TableScrollContainer,
  TableThead,
  TableTr,
  TableTh,
  TableTd,
  TableTbody,
  Anchor,
} from '@mantine/core';
import { getServerClient } from '@/utils/supabase-server';
import InvoicesTableActions from '../InvoicesTableActions/InvoicesTableActions';

export type Invoice = {
  id: number;
  invoice_number: string;
  due_date: string;
};

export async function InvoicesTable() {
  const supabase = getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: invoices } = await supabase
    .from('invoices')
    .select()
    .eq('user_id', user?.id)
    .order('due_date');
  const rows = invoices?.map((invoice) => {
    return (
      <TableTr key={invoice.id}>
        <TableTd>
          <Anchor component="button" fz="sm">
            {invoice.invoice_number}
          </Anchor>
        </TableTd>
        <TableTd>{invoice.due_date}</TableTd>
        <TableTd>
          <InvoicesTableActions
            id={invoice.id}
            notificationsEnabled={invoice.notifications_on}
          />
        </TableTd>
      </TableTr>
    );
  });

  return (
    <TableScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <TableThead>
          <TableTr>
            <TableTh>Invoice No.</TableTh>
            <TableTh>Due date</TableTh>
            <TableTh>Actions</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </TableScrollContainer>
  );
}
