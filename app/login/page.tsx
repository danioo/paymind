'use client';

import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Text, Paper, Group, Button, Stack, Container } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { getBrowserClient } from '@/utils/supabase-client';
import { PasswordInput, TextInput } from '@/components/Inputs/Inputs';

type FormValues = {
  email: string;
  password: string;
};

export default function Profile() {
  const [type] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });
  const supabase = getBrowserClient();
  const router = useRouter();

  const handleLogin = async (values: FormValues) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (!error) {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <Container p="xl">
      <Paper radius="md" shadow="sm" p="xl">
        <Text size="lg" pb="sm" ta="center" fw={500}>
          Welcome to paymind
        </Text>

        <Text c="dimmed" size="sm" ta="center" mt={5} mb="xl">
          Sign in to start using the app
        </Text>

        <form onSubmit={form.onSubmit(handleLogin)}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Button type="submit" radius="xl" m="auto">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
