'use client';

import { Notifications } from '@mantine/notifications';
import NotificationToaster from '@/components/NotificationToaster/NotificationToaster';
import NotificationsProvider from '@/components/NotificationsProvider/NotificationsProvider';

export default function AuthorisedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationsProvider>
      <>
        <Notifications />

        <NotificationToaster />

        {children}
      </>
    </NotificationsProvider>
  );
}
