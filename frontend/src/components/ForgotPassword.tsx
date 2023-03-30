import { useForm } from '@mantine/form'
import {
  Title,
  Text,
  TextInput,
  Button,
  Group,
  Grid,
  Space,
  LoadingOverlay,
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useLogin } from 'lib/auth'

export function ForgotPassword() {
  const form = useForm({
    initialValues: { email: '' },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const { mutate, isLoading, isError, isSuccess } = useLogin()
  const navigate = useNavigate()
  // if (isLoading) return <div>Loading...</div>
  // if (isError) return <div>Error</div>
  // if (isSuccess) {
  //   navigate('/')
  //   return <div>Success</div>
  // }

  return (
    <>
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Grid sx={{ maxWidth: 270 }} mx="auto">
        <Grid.Col>
          <div
            className="heading"
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          >
            <Title mt="sm" style={{ fontSize: 24, fontWeight: 700 }}>
              Reset Password
            </Title>

            <Text color="dimmed" mt="md">
              Enter the Email associated with your account and we will send an
              email with instructions to reset your password.
            </Text>
          </div>
        </Grid.Col>
        <Grid.Col>
          <LoadingOverlay visible={isLoading} overlayBlur={2} />
          <form onSubmit={form.onSubmit((values: any) => mutate(values))}>
            <TextInput
              mt="sm"
              label="Email Address"
              placeholder="Your account email Address"
              {...form.getInputProps('email')}
            />
            <Group position="center" mt="md">
              <Button disabled={isLoading} type="submit" style={{ width: 330 }}>
                Send Instructions
              </Button>
              <Button
                onClick={(e) => navigate('/')}
                disabled={isLoading}
                type="submit"
                style={{ width: 330 }}
              >
                Back to Home Page
              </Button>
            </Group>
          </form>
        </Grid.Col>
      </Grid>
      <Space h="xl" />
      <Space h="xl" />
    </>
  )
}
