import { useForm } from '@mantine/form'
import { PasswordInput, Box, TextInput, Button, Group } from '@mantine/core'
import { Avatar } from '@mantine/core'
import { atom, useAtom } from 'jotai'

export function Register() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone_number: '',
      upi_id: '',
      password: '',
      confirmPassword: '',
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone_number: (value: string) =>
        /^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/.test(value)
          ? null
          : 'Invalid phone number',
      upi_id: (value) =>
        /[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}/.test(value) ? null : 'Invalid UPI ID',
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  })

  return (
    <div>
      <center>
        <h1 className="Heading">Sign Up your Profile</h1>
      </center>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form onSubmit={form.onSubmit(console.log)}>
          <center>
            <Avatar
              src={null}
              alt={{ ...form.getInputProps('name').value }}
              radius="xs"
              size="xl"
              color="red"
            >
              SD
            </Avatar>
          </center>
          <TextInput
            label="Name"
            placeholder="Full Name"
            {...form.getInputProps('name')}
          />
          <TextInput
            mt="sm"
            label="Email"
            placeholder="Email"
            {...form.getInputProps('email')}
          />
          <TextInput
            mt="sm"
            label="Phone Number"
            placeholder="+91 XXXXX XXXXX"
            {...form.getInputProps('phone_number')}
          />
          <TextInput
            mt="sm"
            label="UPI ID"
            placeholder="UPI ID"
            {...form.getInputProps('upi_id')}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...form.getInputProps('password')}
          />

          <PasswordInput
            mt="sm"
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps('confirmPassword')}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  )
}
