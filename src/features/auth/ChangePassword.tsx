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
} from '@mantine/core'

import { useRegister } from 'lib/auth'
import { useNavigate } from 'react-router-dom'

let form: any

export function ChangePassword() {
  form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      password: '',
      confirmPassword: '',
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  })

  const { mutate, isLoading, isError, isSuccess } = useRegister()
  const navigate = useNavigate()
  //   if (isLoading) return <div>Loading...</div>
  //     if (isError) return <div>Error</div>
  //     if (isSuccess) {
  //       navigate('../login')
  //       return <div>Success</div>
  //     }

  return (
    <>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <Title mt="sm" style={{ fontSize: 28, fontWeight: 900 }}>
          Change New Password
        </Title>
        <Text color="dimmed" mt="md">
          Your new password must be difficult from previous used passwords.
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
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps('confirmPassword')}
          />
          <Group position="center" mt="md">
            <Button disabled={isLoading} type="submit" style={{ width: 340 }}>
              Reset Password
            </Button>
          </Group>
        </form>
      </Box>
      <Space h="xl" />
      <Space h="xl" />
    </>
  )
}
