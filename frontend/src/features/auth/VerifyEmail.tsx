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
  token = decodeURI(token.replace(/%dot%/g, '.'))
  console.log(token)

  const { data, isLoading } = useVerifyEmail(token)

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
            <Title mt="sm" style={{ fontSize: 24, fontWeight: 700 }}>
              Check your Email
            </Title>

            <Text color="dimmed" mt="md">
              We have sent an email to
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
