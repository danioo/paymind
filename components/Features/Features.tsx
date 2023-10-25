import { Text, SimpleGrid, Container, rem } from '@mantine/core';
import { IconTruck, IconCertificate, IconCoin } from '@tabler/icons-react';
import classes from './Features.module.css';

interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.FC<any>;
  title: string;
  description: string;
}

function Feature({ icon: Icon, title, description, className, ...others }: FeatureProps) {
  return (
    <div className={classes.feature} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon className={classes.icon} stroke={1.5} />
        <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text c="white" fz="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const mockdata = [
  {
    icon: IconTruck,
    title: 'Artifical Intelligence',
    description:
      'Just upload an image of your invoice and start getting notifications.',
  },
  {
    icon: IconCertificate,
    title: 'Notifications',
    description:
      'Get notifications in browser, via email, via SMS.',
  },
  {
    icon: IconCoin,
    title: 'Paid on time',
    description:
      'Stop to worry about unpaind invoices after due date',
  },
];

export function Features() {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container mt={30} mb={30} size="lg">
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
        {items}
      </SimpleGrid>
    </Container>
  );
}