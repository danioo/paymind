'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { Button } from '@mantine/core';

export default function Invoices() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.refresh();
  };

  return <Button onClick={handleLogout}>LogOut</Button>;
}
