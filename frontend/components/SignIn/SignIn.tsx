'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { GithubButton } from './GithubButton';
import { GoogleButton } from './GoogleButton';

export default function SignIn(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
      roleType: 'STUDENT',
    },
    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val: string) =>
        val.length <= 6 ? 'Password should include at least 6 characters' : null,
    },
  });

  const handleSubmit = async () => {
    setLoading(true);

    if (type === 'register') {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.values.name,
          email: form.values.email,
          password: form.values.password,
          roleType: form.values.roleType,
        }),
      });

      if (res.ok) {
        await signIn('credentials', {
          email: form.values.email,
          password: form.values.password,
          redirect: false,
        });
        router.push('/');
      } else {
        setError('Registration failed');
      }
    } else {
      const result = await signIn('credentials', {
        email: form.values.email,
        password: form.values.password,
        redirect: false,
      });

      if (!result?.error) {
        router.push('/');
      } else {
        setError('Invalid credentials');
      }
    }

    setLoading(false);
  };

  return (
    <Container
      px={0}
      size="30rem"
      h="100vh"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          {upperFirst(type)} to OEM with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton onClick={() => signIn('google')}>Google</GoogleButton>
          <GithubButton onClick={() => signIn('github')}>GitHub</GithubButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@example.com"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password}
              radius="md"
            />

            {type === 'register' && (
              <Select
                label="Role"
                placeholder="Select role"
                data={[
                  { value: 'STUDENT', label: 'Student' },
                  { value: 'TEACHER', label: 'Teacher' },
                ]}  
                value={form.values.roleType}
                onChange={(event) => {
                  if (event) {
                    form.setFieldValue('roleType', event);
                  }
                }}
                radius="md"
              />
            )}

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>

          {error && (
            <Text color="red" size="sm" mt="sm">
              {error}
            </Text>
          )}

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" loading={loading}>
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
