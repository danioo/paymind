import { Button } from '@mantine/core';
import { redirect } from 'next/navigation';
import { UserInfo } from '@/components/UserInfo/UserInfo';
import { getReadServerClient, getServerClient } from '@/utils/supabase-server';
import Link from 'next/link';

export default async function Invoices() {
  const supabase = getReadServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const handleLogout = async () => {
    'use server';

    const supabase = getServerClient();

    await supabase.auth.signOut();

    redirect('/');
  };

  return (
    <>
      <UserInfo />

      <Button
        component={Link}
        href={`https://billing.stripe.com/p/login/cN23djcuJcmubHa000?prefilled_email=${user?.email}`}
      >
        Manage your subscription
      </Button>

      <form action={handleLogout}>
        <Button type="submit">LogOut</Button>
      </form>
    </>
  );
}
