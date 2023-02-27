import { useForm, UseFormReturnType } from '@mantine/form'
import {
  PasswordInput,
  Box,
  TextInput,
  Button,
  Group,
  Center,
  Loader,
  LoadingOverlay,
  Title,
  Space,
} from '@mantine/core'
import { Avatar } from '@mantine/core'
import { atom, useAtom } from 'jotai'
import { useRegister } from 'lib/auth'
import { useNavigate } from 'react-router-dom'

let form: any
const nameAtom = atom('')
const avatarAtom = atom((get) => {
  let text = get(nameAtom)
  text = text.trim()

  if (!(text.length >= 2 && /^[a-zA-Z\s]+$/.test(text) && text.length == 0)) {
    form.setFieldError(
      'name',
      'Name must have at least 2 letters and only contain letters',
    )
    return ''
  }

  const words = text.split(/[^A-Za-z]+/)
  if (words.length > 1 && words[1].length > 0) {
    text = words[0][0] + words[1][0]
  } else {
    text = words[0][0] + words[0][1]
  }

  form.clearFieldError('name')
  return text.toUpperCase()
})

export function Register() {
  form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      upiId: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phoneNumber: (value: string) =>
        /^(0|91)?[6-9][0-9]{9}$/.test(value) ? null : 'Invalid Phone number',
      upiId: (value) =>
        /[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}/.test(value) ? null : 'Invalid UPI ID',
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  })

  const [name, setName] = useAtom(nameAtom)
  const [avatarText] = useAtom(avatarAtom)
  const { mutate, isLoading, isError, isSuccess } = useRegister()
  const navigate = useNavigate()
  // if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  if (isSuccess) {
    navigate('../login')
    return <div>Success</div>
  }

  return (
    <>
      <center>
        <Title mt="sm" style={{ fontSize: 28, fontWeight: 900 }}>
          SignUp Your Profile
        </Title>
      </center>
      <Space h="xl" />
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <form
          onSubmit={form.onSubmit((values: any) =>
            mutate({ ...values, name: name, avatar: avatarText }),
          )}
        >
          <center>
            <Avatar
              src={null}
              alt={avatarText}
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
            {...form.getInputProps('name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            placeholder="Indian Phone Number"
            {...form.getInputProps('phoneNumber')}
          />
          <TextInput
            mt="sm"
            label="UPI ID"
            placeholder="UPI ID"
            {...form.getInputProps('upiId')}
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
            <Button disabled={isLoading} type="submit" style={{ width: 340 }}>
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </>
  )
}
