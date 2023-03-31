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
  Flex,
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
    <Flex gap="xl" justify="center" align="center" direction="column" mx="auto">
      <Box sx={{ maxWidth: 270 }} mx="auto">
        <center>
          <Title mt="sm" style={{ fontSize: 24, fontWeight: 700 }}>
            Change New Password
          </Title>
          <Text color="dimmed" mt="md">
            Your new password must be difference from previous used passwords.
          </Text>
        </center>

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
            <Button disabled={isLoading} type="submit" style={{ width: 270 }}>
              Reset Password
            </Button>
            <Anchor href="#" onClick={(e) => navigate('/auth/forgot')}>
              Forgot Password? Click here to Reset
            </Anchor>
          </Group>
        </form>
      </Box>
    </Flex>
  )
}
