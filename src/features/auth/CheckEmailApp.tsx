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
  Anchor,
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useLogin } from 'lib/auth'
import { IconBrandGmail } from '@tabler/icons-react'

export function CheckEmailApp() {
  const { mutate, isLoading, isError, isSuccess } = useLogin()
  const navigate = useNavigate()
  // if (isLoading) return <div>Loading...</div>
  if (isSuccess) {
    navigate('../login')
    return <div>Success</div>
  }

  return (
    <center>
      <Space h="xl" />
      <Space h="xl" />
      <Grid sx={{ maxWidth: 340 }} mx="auto">
        <Grid.Col>
          <IconBrandGmail size={50} stroke={1.5} />
        </Grid.Col>
        <Grid.Col>
          <div
            className="heading"
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          >
            <Title mt="sm" style={{ fontSize: 34, fontWeight: 900 }}>
              Check your Email
            </Title>

            <Text color="dimmed" mt="md">
              We have sent a password recover instructions to your email.
            </Text>
          </div>
        </Grid.Col>
        <Grid.Col>
          <LoadingOverlay visible={isLoading} overlayBlur={2} />
          <Group position="center" mt="md">
            <Anchor href="#" onClick={(e) => navigate('../login')}>
              Skip, I'll confirm later.
            </Anchor>
          </Group>
        </Grid.Col>
        <Grid.Col>
          <Text mt="md">
            Did not receive the email? Check your spam filter, or try another
            email address.
          </Text>
        </Grid.Col>
      </Grid>
      <Space h="xl" />
      <Space h="xl" />
    </center>
  )
}
