import { MantineProvider as _MantineProvider } from '@mantine/core';

export default function MantineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <_MantineProvider>{children}</_MantineProvider>;
}
