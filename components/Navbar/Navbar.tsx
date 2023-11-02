'use client';

import { Group, ScrollArea } from '@mantine/core';
import { createBrowserClient } from '@supabase/ssr';
import { UserButton } from '../UserButton/UserButton';
import { NavbarLinksGroup } from './LinkGroup';
import classes from './Navbar.module.css';

export async function Navbar() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
