import Link from 'next/link'
import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './Error.module.css';

export default function NotFound() {
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>Nothing to see here</Title>
        <Text size="lg" ta="center" className={classes.description}>
        Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
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
  )
}