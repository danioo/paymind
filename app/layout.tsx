import '@mantine/core/styles.css';
import classes from './page.module.css';
import { ColorSchemeScript } from '@mantine/core';
import type { Metadata } from 'next';
import MantineProvider from '@/components/MantineProvider/MantineProvider';
import { CSPostHogProvider } from '@/app/providers';

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

      <CSPostHogProvider>
        <body className={classes.root}>
          <MantineProvider>{children}</MantineProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
