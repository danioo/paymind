'use client'

import { Drawer as _Drawer, Text, Checkbox, Group, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form'
import { Knock } from '@knocklabs/node'
import { TextInput } from '../Inputs/Inputs';

export default function Drawer({ buttonLabel, buttonClassName}) {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      termsOfService: (value) => value == true ? null : 'Select to let us update you via email',
    }
  })
  const handleSubmit = async (values) => {
    const knock = new Knock("sk_test_E7KSnPZLnHV01br4R9bXytfykRm1Pyq6Cjxm6Lf2jtU")
    await knock.workflows.trigger("waitlist-join", {
      recipients: ["user-0"],
      data: {
        "email": values.email
      }
    })

    form.reset()
    close()
  }

  return (
    <>
      <_Drawer opened={opened} onClose={close} position="right">
        <Text pb="md">Join our waitlist!</Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput {...form.getInputProps('email')} />

          <Text pt="sm">The information you provide on this form will only be used to provide you with updates. Your privacy is important to us! Please let us know how you would like to keep in touch:</Text>

          <Checkbox
            mt="md"
            label="Email"
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Send</Button>
          </Group>
        </form>
      </_Drawer>

      <Button onClick={open} className={buttonClassName}>{buttonLabel}</Button>
    </>
  );
}