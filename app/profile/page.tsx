'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@mantine/core';
import { getBrowserClient } from '@/utils/supabase-client';

export default function Invoices() {
  const supabase = getBrowserClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.refresh();
  };

  return <Button onClick={handleLogout}>LogOut</Button>;
}
