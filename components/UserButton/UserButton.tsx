'use client'

import Link from 'next/link'
import { Avatar, Grid, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';

export function UserButton({ user }) {
  return (
    <Link href={user ? "/profile" : "/login"} className={classes.user}>
      <Grid joustify="space-between" align="center">
        <Grid.Col span={3}>
          <Avatar
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            radius="xl"
          />
        </Grid.Col>
        <Grid.Col span="auto">
          <Text size="sm" fw={500}>
            {user?.user_metadata?.profile?.first_name && user?.user_metadata?.profile?.last_name ? `${user.user_metadata.profile.first_name} ${user.user_metadata.profile.last_name}` : 'Guest'}
          </Text>
          <Text c="dimmed" size="xs">
            {user?.email ?? ''}
          </Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <IconChevronRight size={14} stroke={1.5} />
        </Grid.Col>
      </Grid>
    </Link>
  );
}