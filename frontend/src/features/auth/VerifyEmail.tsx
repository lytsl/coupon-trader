import {
  Title,
  Text,
  Button,
  Group,
  Grid,
  Space,
  LoadingOverlay,
} from '@mantine/core'
import { useNavigate, useParams } from 'react-router-dom'
import { IconBrandGmail } from '@tabler/icons-react'
import { useVerifyEmail } from 'lib/auth'

export function VerifyEmail() {
  const navigate = useNavigate()
  let { token } = useParams()
  if (!token) {
    return <h1>Bad Request</h1>
  }
  token = token.replace(/%dot%/g, '.')
  console.log(token)

  const { data, isLoading, error } = useVerifyEmail(token)

  if (error) {
    return <h1>Could not verify email</h1>
  }

  // TODO: set proper ui
  return (
    <center>
      <Space h="xl" />
      <Space h="xl" />
      <Grid sx={{ maxWidth: 270 }} mx="auto">
        <Grid.Col>
          <IconBrandGmail size={50} stroke={1.5} />
        </Grid.Col>
        <Grid.Col>
          <div
            className="heading"
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          >
            <Text color="dimmed" mt="md">
              Your Email has successfully verified.
            </Text>
          </div>
        </Grid.Col>
        <Grid.Col>
          <LoadingOverlay visible={isLoading} overlayBlur={2} />
          <Group position="center" mt="md">
            <Button type="submit" onClick={(e) => navigate('/')}>
              Get Started
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
      <Space h="xl" />
      <Space h="xl" />
    </center>
  )
}
