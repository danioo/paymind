import Link from 'next/link';
import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './Error.module.css';
import MantineProvider from '@/components/MantineProvider/MantineProvider';

export default function NotFound() {
  return (
    <MantineProvider>
      <div className={classes.root}>
        <Container>
          <div className={classes.label}>404</div>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text size="lg" ta="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped
            the the address, or the page has been moved to another URL. If you
            think is an error contact support.
          </Text>
          <Group justify="center">
            <Link href="/">
              <Button variant="white" size="md">
                Take me back to home
              </Button>
            </Link>
          </Group>
        </Container>
      </div>
    </MantineProvider>
  );
}
