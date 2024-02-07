import { Button } from '@mantine/core';
import { redirect } from 'next/navigation';
import { UserInfo } from '@/components/UserInfo/UserInfo';
import { getServerClient } from '@/utils/supabase-server';

export default async function Invoices() {
  const handleLogout = async () => {
    'use server';

    const supabase = getServerClient();

    await supabase.auth.signOut();

    redirect('/');
  };

  return (
    <>
      <UserInfo />

      <form action={handleLogout}>
        <Button type="submit">LogOut</Button>
      </form>
    </>
  );
}
