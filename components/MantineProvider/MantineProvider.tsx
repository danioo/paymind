import { MantineProvider as _MantineProvider, Grid } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';

export default function MantineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <_MantineProvider>
      <Grid gutter="0">
        <Navbar />

        {children}
      </Grid>
    </_MantineProvider>
  );
}
