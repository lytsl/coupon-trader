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
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useLogin } from 'lib/auth'

export function Login() {
  const form = useForm({
    initialValues: { email: '', password: '' },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value == null ? 'Enter Password' : null),
    },
  })

  const { mutate, isLoading, isError, isSuccess } = useLogin()
  const navigate = useNavigate()
  // if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  if (isSuccess) {
    navigate('/')
    return <div>Success</div>
  }

  return (
    <>
      <Space h="xl" />
      <center>
        <h1 className="Heading">Log In your Profile</h1>
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
              label="Email"
              placeholder="Email"
              {...form.getInputProps('email')}
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
