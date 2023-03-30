import { useForm, UseFormReturnType } from '@mantine/form'
import {
  PasswordInput,
  Box,
  TextInput,
  Button,
  Group,
  LoadingOverlay,
  Title,
  Space,
} from '@mantine/core'
import { Avatar } from '@mantine/core'
import { useRegister } from 'lib/auth'
import { useNavigate } from 'react-router-dom'
import { RegisterDTO } from 'features/auth/api'
import { useState } from 'react'

let form: UseFormReturnType<RegisterDTO, (values: RegisterDTO) => RegisterDTO>

export function Register() {
  form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    } as RegisterDTO,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length < 8 ? 'Password must be at least 8 characters' : null,
      cpassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  })

  const [avatarText, setAvatarText] = useState('')
  const { mutate, isLoading, isError, isSuccess } = useRegister()
  const navigate = useNavigate()
  if (isSuccess) {
    navigate('../confirmation')
    return <div>Success</div>
  }

  function handleUserNameChange(e: any) {
    let text = e.target.value
    // text = text.trim()

    form.setFieldValue('username', text)
    if (!(text.length >= 3 && /^[a-zA-Z0-9]+$/.test(text))) {
      form.setFieldError(
        'username',
        'Name must have at least 3 letters and only contain letters',
      )
      setAvatarText('')
    } else {
      text = text.slice(0, 2).toUpperCase()
      form.clearFieldError('username')
      setAvatarText(text)
    }
  }

  return (
    <>
      <Space h="xl" />
      <Space h="xl" />
      <center>
        <Title mt="sm" style={{ fontSize: 28, fontWeight: 900 }}>
          SignUp Your Profile
        </Title>
      </center>
      <Space h="xl" />
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <form onSubmit={form.onSubmit((values: any) => mutate({ ...values }))}>
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
            label="Username"
            placeholder="Username"
            {...form.getInputProps('username')}
            onChange={handleUserNameChange}
          />
          <TextInput
            mt="sm"
            label="Email"
            placeholder="Email"
            {...form.getInputProps('email')}
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
            {...form.getInputProps('cpassword')}
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
