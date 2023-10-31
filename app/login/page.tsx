'use client'

import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  Text,
  Paper,
  Group,
  Button,
  Stack,
} from '@mantine/core';
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { PasswordInput, TextInput } from '@/components/Inputs/Inputs';

export default function Profile() {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const router = useRouter()

  const handleLogin = async (values) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })

    router.refresh()
  }
  const handleLogout = async () => {
    await supabase.auth.signOut()

    router.refresh()
  }

  return (
    <Paper radius="md" shadow="sm" p="xl" m="auto">
      <Text size="lg" pb="sm" fw={500}>
        Welcome to paymind
      </Text>

      <form onSubmit={form.onSubmit(handleLogin)}>
        <Stack>
          {/* {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )} */}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />

          {/* {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )} */}
        </Stack>

        <Group justify="space-between" mt="xl">
          {/* <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor> */}
          <Button type="submit" radius="xl" m="auto">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>

      <Button onClick={handleLogout}>LogOut</Button>
    </Paper>
  );
}