import { Group, ScrollArea } from '@mantine/core';
import { UserButton } from '../UserButton/UserButton';
import { NavbarLinksGroup } from './LinkGroup';
import classes from './Navbar.module.css';
import { getReadServerClient } from '@/utils/supabase-server';
import { UsageCard } from '../UsageCard/UsageCard';
import Image from 'next/image';

export async function Navbar() {
  const supabase = getReadServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name')
    .eq('user_id', user?.id ?? '')
    .single();

  if (user) {
    user.user_metadata['profile'] = profile;
  }

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Image alt="logo" src="logo.svg" width="270" height="55" />
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          <NavbarLinksGroup user={user} />
        </div>
      </ScrollArea>

      <div className={classes.usage}>
        <UsageCard user={user} />
      </div>

      <div className={classes.footer}>
        <UserButton user={user} />
      </div>
    </nav>
  );
}
