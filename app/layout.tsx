import '@mantine/core/styles.css';
import classes from './page.module.css';
import { ColorSchemeScript, Grid } from '@mantine/core';
import type { Metadata } from 'next';
import MantineProvider from '@/components/MantineProvider/MantineProvider';
import { Navbar } from '@/components/Navbar/Navbar';

export const metadata: Metadata = {
  title: 'paymind',
  description: 'Never forget to pay invoice anymore!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>

      <body className={classes.root}>
        <MantineProvider>
          <Grid gutter="0">
            <Navbar />

            <div className={classes.children}>{children}</div>
          </Grid>
        </MantineProvider>
      </body>
    </html>
  );
}
