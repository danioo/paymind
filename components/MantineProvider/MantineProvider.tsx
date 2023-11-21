import { MantineProvider as _MantineProvider, Grid } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import classes from './MantineProvider.module.css';

export default function MantineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <_MantineProvider>
      <Grid gutter="0">
        <Navbar />

        <div className={classes.root}>{children}</div>
      </Grid>
    </_MantineProvider>
  );
}
