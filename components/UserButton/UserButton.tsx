import Link from 'next/link';
import { Avatar, Grid, GridCol, Text, ThemeIcon, rem } from '@mantine/core';
import { IconKey } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { User } from '@supabase/supabase-js';

type UserButtonProps = {
  user: User | null;
};

export function UserButton({ user }: UserButtonProps) {
  return (
    <Link href={user ? '/profile' : '/login'} className={classes.user}>
      <Grid justify="space-between" align="center">
        <GridCol span={user ? 3 : 0}>
          {user ? (
            <Avatar src={null} radius="xl" />
          ) : (
            <ThemeIcon variant="light" size={30}>
              <IconKey style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
          )}
        </GridCol>
        <GridCol span="auto">
          <Text size="sm" fw={500}>
            {user?.user_metadata?.profile?.first_name &&
            user?.user_metadata?.profile?.last_name
              ? `${user.user_metadata.profile.first_name} ${user.user_metadata.profile.last_name}`
              : 'Sign in'}
          </Text>
          <Text c="dimmed" size="xs">
            {user?.email ?? ''}
          </Text>
        </GridCol>
      </Grid>
    </Link>
  );
}
