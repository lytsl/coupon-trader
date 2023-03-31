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
import { useLocation, useNavigate } from 'react-router-dom'
import { useEmailVerify, useLogin } from 'lib/auth'
import { IconBrandGmail } from '@tabler/icons-react'
import { RegisterDTO } from './api'

export function CheckEmailApp() {
  const registerData: RegisterDTO = useLocation().state
  const { mutate, isLoading, isError, isSuccess } = useEmailVerify()
  const navigate = useNavigate()
  if (isSuccess) {
    navigate('/app/user/profile/')
    return <div>Success</div>
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
              We have sent an email to {registerData.email}.
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
