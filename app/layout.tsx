'use client';

import '@mantine/core/styles.css';
import './page.module.css';
import { MantineProvider, ColorSchemeScript, Grid } from '@mantine/core';
// import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar/Navbar';

// export const metadata: Metadata = {
//   title: 'My invoice',
//   description: 'Never forget to pay invoice anymore!',
// };

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

      <body>
        <MantineProvider>
          <Grid gutter="0">
            <Navbar />
            {children}
          </Grid>
        </MantineProvider>
      </body>
    </html>
  );
}
