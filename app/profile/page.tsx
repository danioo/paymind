import { Button } from '@mantine/core';
import { redirect } from 'next/navigation';
import { UserInfo } from '@/components/UserInfo/UserInfo';

export default async function Invoices() {
  const handleLogout = async () => {
    'use server';

    redirect('/auth/logout');
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
