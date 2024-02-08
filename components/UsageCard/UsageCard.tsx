'use client';

import { getBrowserClient } from '@/utils/supabase-client';
import { Text, Progress, Card } from '@mantine/core';
import { User } from '@supabase/supabase-js';
import { Client } from 'lago-javascript-client';
import { useCallback, useEffect, useState } from 'react';

export function UsageCard({ user }: { user: User | null }) {
  const [used, setUsed] = useState(0);
  const [allowed, setAllowed] = useState(5);
  const getAllowed = useCallback(async () => {
    const client = Client(process.env.NEXT_PUBLIC_LAGO_API_KEY ?? '', {
      baseUrl: 'https://lago-api-local.onrender.com/api/v1',
    });
    const { data, error } = await client.subscriptions.findAllSubscriptions({
      external_customer_id: user?.id,
      page: 1,
    });

    if (!error) {
      console.log(data?.subscriptions?.[0]?.plan_code);
      const plan = data?.subscriptions?.[0]?.plan_code ?? 'free';
      let allowedUsage = 5;

      switch (plan) {
        case 'premium':
          allowedUsage = 10;
          break;
        case 'unlimited':
          allowedUsage = 9999;
          break;
      }

      setAllowed(allowedUsage);
    }
  }, [user]);
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
      getAllowed();
      getUsed();
    }
  }, [user, getAllowed, getUsed]);

  if (!user) {
    return null;
  }

  return (
    <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Monthly usage
      </Text>
      <Text fz="lg" fw={500}>
        {`${used} / ${allowed}`}
      </Text>
      <Progress value={(used / allowed) * 100} mt="md" size="lg" radius="xl" />
    </Card>
  );
}
