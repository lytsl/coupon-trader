import {
  Title,
  Text,
  Button,
  Group,
  Grid,
  Space,
  LoadingOverlay,
  Anchor,
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useSendVerificationEmail, useUser } from 'lib/auth'
import { IconBrandGmail } from '@tabler/icons-react'

export function CheckEmailApp() {
  const { data: userData } = useUser()

  const navigate = useNavigate()

  if (!userData) {
    return <div>Unknown Error</div>
  }

  const { mutate, isLoading, isError, isSuccess } = useSendVerificationEmail()
  if (isSuccess) {
    navigate('/app/user/profile/')
    // return <div>Success</div>
  }

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
              We have sent an email to {userData.email}.
            </Text>
          </div>
        </Grid.Col>
        <Grid.Col>
          <LoadingOverlay visible={isLoading} overlayBlur={2} />
          <Group position="center" mt="md">
            <Button type="submit" onClick={(e) => mutate()}>
              Resend Verification Email
            </Button>
            <Anchor href="#" onClick={(e) => navigate('/app/user/profile/')}>
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
