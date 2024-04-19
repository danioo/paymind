'use client';

import { getBrowserClient } from '@/utils/supabase-client';
import { ActionIcon, Group } from '@mantine/core';
import {
  IconBellOff,
  IconBell,
  IconTrashXFilled,
  IconEdit,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function InvoicesTableActions({
  id,
  notificationsEnabled,
}: {
  id: number;
  notificationsEnabled: boolean;
}) {
  const router = useRouter();
  const supabase = getBrowserClient();
  const deleteInvoice = async (id: number) => {
    await supabase.from('invoices').delete().eq('id', id);

    router.refresh();
  };
  const toggleNotifications = async (
    notificationsEnabled: boolean,
    id: number,
  ) => {
    await supabase
      .from('invoices')
      .update({ notifications_on: !notificationsEnabled })
      .eq('id', id);

    router.refresh();
  };

  return (
    <Group>
      <ActionIcon onClick={() => router.push(`/invoices/${id}/edit`)}>
        <IconEdit />
      </ActionIcon>

      <ActionIcon onClick={() => toggleNotifications(notificationsEnabled, id)}>
        {notificationsEnabled ? <IconBellOff /> : <IconBell />}
      </ActionIcon>

      <ActionIcon color="red" onClick={() => deleteInvoice(id)}>
        <IconTrashXFilled />
      </ActionIcon>
    </Group>
  );
}
