'use client';

import Link from 'next/link';
import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './Error.module.css';
import MantineProvider from '@/components/MantineProvider/MantineProvider';

export default function GlobalError({
  // error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <MantineProvider>
      <div className={classes.root}>
        <Container>
          <div className={classes.label}>500</div>
          <Title className={classes.title}>
            Something bad just happened...
          </Title>
          <Text size="lg" ta="center" className={classes.description}>
            Our servers could not handle your request. Don&apos;t worry, our
            development team was already notified. Try refreshing the page.
          </Text>
          <Group justify="center">
            <Link href="/">
              <Button variant="white" size="md" onClick={() => reset()}>
                Refresh the page
              </Button>
            </Link>
          </Group>
        </Container>
      </div>
    </MantineProvider>
  );
}
