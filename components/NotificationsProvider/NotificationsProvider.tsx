import { KnockProvider, KnockFeedProvider } from '@knocklabs/react';
import { Notifications } from '@mantine/notifications';
import NotificationToaster from '../NotificationToaster/NotificationToaster';

import '@mantine/notifications/styles.css';
import { Knock } from '@knocklabs/node';
import { getBrowserClient } from '@/utils/supabase-client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

export default function NotificationsProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [user, setUser] = useState<User>();

  const initialize = async () => {
    const supabase = getBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const knock = new Knock(process.env.NEXT_PUBLIC_KNOCK_SECRET_KEY);

    if (user) {
      setUser(user);

      await knock.users.identify(user.id, {
        email: user.email,
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_SECRET_KEY ?? ''}
      userId={user?.id ?? ''}
    >
      <KnockFeedProvider
        feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID ?? ''}
      >
        <>
          <Notifications />
          <NotificationToaster />

          {children}
        </>
      </KnockFeedProvider>
    </KnockProvider>
  );
}
