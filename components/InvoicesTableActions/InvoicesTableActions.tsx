'use client';

import { getBrowserClient } from '@/utils/supabase-client';
import { ActionIcon, Group } from '@mantine/core';
import { IconBellOff, IconBell, IconTrashXFilled } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function InvoicesTableActions({
  id,
  notificationsEnabled,
}: {
  id: string;
  notificationsEnabled: boolean;
}) {
  const router = useRouter();
  const supabase = getBrowserClient();
  const deleteInvoice = async (id: string) => {
    await supabase.from('invoices').delete().eq('id', id);

    router.refresh();
  };
  const toggleNotifications = async (
    notificationsEnabled: boolean,
    id: string,
  ) => {
    await supabase
      .from('invoices')
      .update({ notifications_on: !notificationsEnabled })
      .eq('id', id);

    router.refresh();
  };

  return (
    <Group>
      <ActionIcon
        size="sm"
        onClick={() => toggleNotifications(notificationsEnabled, id)}
      >
        {notificationsEnabled ? <IconBellOff /> : <IconBell />}
      </ActionIcon>

      <ActionIcon color="red" size="sm" onClick={() => deleteInvoice(id)}>
        <IconTrashXFilled />
      </ActionIcon>
    </Group>
  );
}
