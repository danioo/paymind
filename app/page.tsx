import { Container, Title, Group, Text, Button } from '@mantine/core';
import Features from '@/components/Features/Features';
import Drawer from '@/components/Drawer/Drawer';
import classes from './Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              An <span className={classes.highlight}>AI supported</span> invoice
              reminder
            </Title>

            <Text className={classes.description} mt={30}>
              Have you ever forgot to pay invoice on time? Paymind will scan
              your invoice and remind you to pay all on time!
            </Text>

            <Features />

            <Group className={classes.control}>
              <Drawer buttonLabel="Join waitlist" buttonClassName="" />

              <Button
                component={Link}
                href="/pricing"
                color="white"
                variant="outline"
              >
                Check pricing
              </Button>
            </Group>
          </div>
        </div>
      </Container>
    </div>
  );
}
