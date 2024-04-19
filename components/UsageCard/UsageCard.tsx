'use client';

import { getBrowserClient } from '@/utils/supabase-client';
import { Text, Progress, Card } from '@mantine/core';
import { User } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';

export function UsageCard({ user }: { user: User | null }) {
  const [used, setUsed] = useState(0);
  const getUsed = useCallback(async () => {
    const supabase = getBrowserClient();

    const { data: usage, error } = await supabase
      .from('usages')
      .select('usage')
      .eq('user_id', user?.id ?? '')
      .limit(1)
      .single();

    if (!error) {
      setUsed(usage.usage);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getUsed();
    }
  }, [user, getUsed]);

  if (!user) {
    return null;
  }

  return (
    <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Monthly usage
      </Text>
      <Text fz="lg" fw={500}>
        {`${used} / 5`}
      </Text>
      <Progress value={(used / 5) * 100} mt="md" size="lg" radius="xl" />
    </Card>
  );
}
