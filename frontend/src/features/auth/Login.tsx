import { useForm } from '@mantine/form'
import {
  PasswordInput,
  TextInput,
  Button,
  Group,
  Grid,
  Space,
  Image,
  LoadingOverlay,
  Text,
  Anchor,
  Title,
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useLogin } from 'lib/auth'
import { LoginDTO } from './api'

export function Login() {
  const form = useForm({
    initialValues: { username: '', password: '' } as LoginDTO,

    validate: {
      username: (value) =>
        value.length >= 3 && /^[a-zA-Z0-9]+$/.test(value)
          ? null
          : 'Invalid username',
      password: (value) => (value == null ? 'Enter Password' : null),
    },
  })

  const { mutate, isLoading, isError, isSuccess } = useLogin()
  const navigate = useNavigate()
  // if (isLoading) return <div>Loading...</div>
  if (isSuccess) {
    navigate('/')
    return <div>Success</div>
  }

  return (
    <>
      <Space h="xl" />
      <center>
        <Title mt="sm" style={{ fontSize: 28, fontWeight: 900 }}>
          LogIn Your Profile
        </Title>
      </center>
      <Space h="xl" />
      <Grid sx={{ maxWidth: 340 }} mx="auto">
        <Grid.Col>
          <div style={{ width: 200, marginLeft: 'auto', marginRight: 'auto' }}>
            <Image
              radius="md"
              src="\src\assets\coupon-logo.png"
              alt="Login Image"
            />
          </div>
        </Grid.Col>
        <Grid.Col>
          <LoadingOverlay visible={isLoading} overlayBlur={2} />
          <form onSubmit={form.onSubmit((values: any) => mutate(values))}>
            <TextInput
              mt="sm"
              label="username"
              placeholder="username"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              {...form.getInputProps('password')}
            />
            <Group position="center" mt="md">
              <Button disabled={isLoading} type="submit" style={{ width: 330 }}>
                Submit
              </Button>
              <Anchor href="#" onClick={(e) => navigate('../forgot')}>
                Forgot Password? Click here to Reset
              </Anchor>
            </Group>
          </form>
        </Grid.Col>
      </Grid>
    </>
  )
}
