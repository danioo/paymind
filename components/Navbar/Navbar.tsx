import { Group, ScrollArea } from '@mantine/core';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { UserButton } from '../UserButton/UserButton';
import { NavbarLinksGroup } from './LinkGroup';
import classes from './Navbar.module.css';

export async function Navbar() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete({ name, ...options });
        },
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name');

  if (user) {
    user.user_metadata['profile'] = profile?.[0];
  }

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <img src="logo.svg" />
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          <NavbarLinksGroup user={user} />
        </div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton user={user} />
      </div>
    </nav>
  );
}
