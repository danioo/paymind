import Pricing from '@/components/Pricing/Pricing';
import { Container, Title, Text } from '@mantine/core';
import classes from './page.module.css';

export default async function PricingPage() {
  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Pricing
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Choose the best pricing model for you. Every plan includes different
        amount of documents you can process monthly.
      </Text>

      <Pricing />
    </Container>
  );
}
