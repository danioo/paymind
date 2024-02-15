'use client';

import { useCallback, useEffect } from 'react';
import { useKnockFeed } from '@knocklabs/react';
import { FeedEventCallback } from '@knocklabs/client/dist/types/clients/feed/types';
import { notifications } from '@mantine/notifications';

const NotificationToaster = () => {
  const { feedClient } = useKnockFeed();

  const onNotificationsReceived = useCallback<FeedEventCallback>(
    ({ items }) => {
      // Whenever we receive a new notification from our real-time stream, show a toast
      // (note here that we can receive > 1 items in a batch)
      items.forEach((notification) => {
        console.log(notification);

        notifications.show({
          title: 'Due date is approaching',
          message: 'Due date of your invoice is approaching.',
        });
      });

      // Optionally, you may want to mark them as "seen" as well
      feedClient.markAsSeen(items);
    },
    [feedClient],
  );

  useEffect(() => {
    // Receive all real-time notifications on our feed
    feedClient.on('items.received.realtime', onNotificationsReceived);

    // Cleanup
    return () =>
      feedClient.off('items.received.realtime', onNotificationsReceived);
  }, [feedClient, onNotificationsReceived]);

  return <></>;
};

export default NotificationToaster;
