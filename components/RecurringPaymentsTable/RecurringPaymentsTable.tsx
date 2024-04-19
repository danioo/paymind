'use client';

import {
  ActionIcon,
  Anchor,
  Table,
  TableScrollContainer,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { getBrowserClient } from '@/utils/supabase-client';
import { useCallback, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export function RecurringPaymentsTable() {
  const [user, setUser] = useState<User | null>();
  const [recurringPayments, setRecurringPayments] = useState<any[] | null>();
  const router = useRouter();
  const supabase = getBrowserClient();
  const setPaid = async (id: number, paid: boolean) => {
    await supabase
      .from('recurring_payments')
      .update({
        paid: paid,
      })
      .eq('id', id)
      .select();

    router.refresh();
  };
  const getUser = useCallback(async () => {
    const {
      data: { user: userData },
    } = await supabase.auth.getUser();

    setUser(userData);
  }, [supabase]);
  const getRecurringPayments = useCallback(async () => {
    if (!user) {
      return;
    }

    const { data: recurringPayments } = await supabase
      .from('recurring_payments')
      .select()
      .eq('user_id', user?.id ?? '')
      .order('date');

    setRecurringPayments(recurringPayments);
  }, [supabase, user]);

  useEffect(() => {
    getUser();
    getRecurringPayments();
  }, [getUser, getRecurringPayments, user]);

  const rows = recurringPayments?.map((recurringPayment) => {
    return (
      <TableTr key={recurringPayment.id}>
        <TableTd>{recurringPayment.supplier_name}</TableTd>
        <TableTd>
          <Anchor component="button" fz="sm">
            {recurringPayment.date}
          </Anchor>
        </TableTd>
        <TableTd>{recurringPayment.amount}</TableTd>
        <TableTd>
          <ActionIcon
            variant="filled"
            color={recurringPayment.paid ? 'green' : 'red'}
          >
            {recurringPayment.paid ? (
              <IconCheck
                color="white"
                onClick={() => setPaid(recurringPayment.id, false)}
              />
            ) : (
              <IconX
                color="white"
                onClick={() => setPaid(recurringPayment.id, true)}
              />
            )}
          </ActionIcon>
        </TableTd>
      </TableTr>
    );
  });

  return (
    <TableScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <TableThead>
          <TableTr>
            <TableTh>Supplier name</TableTh>
            <TableTh>Date</TableTh>
            <TableTh>Amount</TableTh>
            <TableTh>Paid</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </TableScrollContainer>
  );
}
