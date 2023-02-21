import { useForm } from '@mantine/form'
import { PasswordInput, Box, TextInput, Button, Group } from '@mantine/core'
import { Avatar } from '@mantine/core'
import { useState } from 'react'

export function Register() {
  const form = useForm({
    validateInputOnBlur: true,
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
      name: (value) => {
        console.log('from validator ' + value)
        return value.length < 2 ? 'Name must have at least 2 letters' : null
      },
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

  const [name, setName] = useState('')
  const [avatarText, setAvatarText] = useState('')

  const handleChange = (e: any) => {
    let text = e.target.value
    setName(text)
    if (text.length < 2) {
      setAvatarText('')
      return
    }

    const words = text.split(' ')

    if (words.length > 1 && words[1].length > 0) {
      text = words[0][0] + words[1][0]
    } else {
      text = words[0][0] + words[0][1]
    }
    setAvatarText(text.toUpperCase())
  }

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
              alt={form.getInputProps('name').value}
              radius="xs"
              size="xl"
              color="sky"
            >
              {avatarText}
            </Avatar>
          </center>
          <TextInput
            label="Name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => handleChange(e)}
            // {...form.getInputProps('name')}
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
          <Group position="center" mt="md">
            <Button type="submit" style={{ width: 340 }}>
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  )
}
