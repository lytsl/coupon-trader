import { useForm, UseFormReturnType } from '@mantine/form'
import {
  PasswordInput,
  Box,
  Button,
  Group,
  LoadingOverlay,
  Text,
  Space,
  Title,
  Anchor,
} from '@mantine/core'

import { useRegister } from 'lib/auth'
import { useNavigate } from 'react-router-dom'

let form: any

export function ChangePassword() {
  form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.newPassword ? 'Passwords did not match' : null,
    },
  })

  const { mutate, isLoading, isError, isSuccess } = useRegister()
  const navigate = useNavigate()

  return (
    <>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <Title mt="sm" style={{ fontSize: 28, fontWeight: 900 }}>
          Change New Password
        </Title>
        <Text color="dimmed" mt="md">
          Your new password must be difference from previous used passwords.
        </Text>
        <Space h="xl" />
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <form onSubmit={form.onSubmit((values: any) => mutate({ ...values }))}>
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            mt="sm"
            label="New Password"
            placeholder="New Password"
            {...form.getInputProps('newPassword')}
          />

          <PasswordInput
            mt="sm"
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps('confirmPassword')}
          />
          <Group position="center" mt="md">
            <Button disabled={isLoading} type="submit" style={{ width: 340 }}>
              Reset Password
            </Button>
            <Anchor href="#" onClick={(e) => navigate('../../auth/forgot')}>
              Forgot Password? Click here to Reset
            </Anchor>
          </Group>
        </form>
      </Box>
      <Space h="xl" />
      <Space h="xl" />
    </>
  )
}
