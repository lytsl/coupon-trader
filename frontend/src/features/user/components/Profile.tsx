import { useForm, UseFormReturnType } from '@mantine/form'
import {
  Box,
  TextInput,
  Button,
  Group,
  LoadingOverlay,
  Title,
  Space,
  Flex,
  rem,
  Loader,
  Center,
} from '@mantine/core'
import { Avatar } from '@mantine/core'
import { atom, useAtom } from 'jotai'
import { useSendVerificationEmail, useRegister, useUser } from 'lib/auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { IconCircleCheck } from '@tabler/icons-react'

// todo fetch placeholder values from database as from register..............................
export function Profile() {
  const { data: userData, isLoading: isLoadingUser } = useUser()
  const [avatarText, setAvatarText] = useState('')
  const { mutate: verify } = useSendVerificationEmail()

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      username: userData?.username || '',
      email: userData?.email || '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  function handleUserNameChange(e: any) {
    e.preventDefault()
    let text = e.target.value
    // text = text.trim()

    form.setFieldValue('username', text)
    if (!(text.length >= 3 && /^[a-zA-Z0-9]+$/.test(text))) {
      form.setFieldError('username', 'Name must have at least 3 letters and only contain letters')
      setAvatarText('')
    } else {
      text = text.slice(0, 2).toUpperCase()
      form.clearFieldError('username')
      setAvatarText(text)
    }
  }

  if (isLoadingUser) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }

  if (userData && form.values.email === '') {
    form.setFieldValue('email', userData.email)
    form.setFieldValue('username', userData.username)
  }

  return (
    <Flex
      gap="xl"
      justify="center"
      align="center"
      direction="column"
      mx="auto"
      style={{ marginTop: 30 }}
      // wrap="wrap"
    >
      <center>
        <Title mt="sm" style={{ fontSize: 24, fontWeight: 700 }}>
          Profile
        </Title>
      </center>
      <Box sx={{ maxWidth: 270 }}>
        {/* <LoadingOverlay visible={isLoading} overlayBlur={2} /> */}
        <form
        // onSubmit={form.onSubmit((values: any) =>
        //   mutate({ ...values, name: name, avatar: avatarText }),
        // )}
        >
          <center>
            <Avatar src={null} alt={avatarText} radius="xs" size="xl" color="sky">
              {avatarText}
            </Avatar>
          </center>
          <TextInput
            label="Username"
            placeholder="Username"
            {...form.getInputProps('username')}
            onChange={handleUserNameChange}
          />
          {/* <Group position="center" mt="md" spacing="sm"> */}
          <TextInput
            label="Email"
            placeholder="Email"
            rightSection={userData?.emailverified && <IconCircleCheck color="blue" />}
            {...form.getInputProps('email')}
          />
          {/* </Group> */}
          {!userData?.emailverified && (
            <Button
              // disabled={isLoading}
              type="button"
              mt="md"
              style={{ width: 270 }}
              onClick={() => verify()}
            >
              Verify Email
            </Button>
          )}
          <Group position="center" mt="md">
            <Button
              // disabled={isLoading}
              type="submit"
              style={{ width: 270 }}
            >
              Save Changes
            </Button>
          </Group>
        </form>
      </Box>
    </Flex>
  )
}
