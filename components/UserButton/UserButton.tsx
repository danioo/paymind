import Link from 'next/link';
import { Avatar, Grid, GridCol, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { User } from '@supabase/supabase-js';

type UserButtonProps = {
  user: User | null;
};

export function UserButton({ user }: UserButtonProps) {
  return (
    <Link href={user ? '/profile' : '/login'} className={classes.user}>
      <Grid justify="space-between" align="center">
        <GridCol span={3}>
          <Avatar src={null} radius="xl" />
        </GridCol>
        <GridCol span="auto">
          <Text size="sm" fw={500}>
            {user?.user_metadata?.profile?.first_name &&
            user?.user_metadata?.profile?.last_name
              ? `${user.user_metadata.profile.first_name} ${user.user_metadata.profile.last_name}`
              : 'Guest'}
          </Text>
          <Text c="dimmed" size="xs">
            {user?.email ?? ''}
          </Text>
        </GridCol>
        <GridCol span={2}>
          <IconChevronRight size={14} stroke={1.5} />
        </GridCol>
      </Grid>
    </Link>
  );
}
