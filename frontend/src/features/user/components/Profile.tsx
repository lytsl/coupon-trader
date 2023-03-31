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
} from '@mantine/core'
import { Avatar } from '@mantine/core'
import { atom, useAtom } from 'jotai'
import { useRegister, useUser } from 'lib/auth'
import { useNavigate } from 'react-router-dom'

let form: any
const nameAtom = atom('')
const avatarAtom = atom((get) => {
  let text = get(nameAtom)
  text = text.trim()

  if (!(text.length >= 2 && /^[a-zA-Z\s]+$/.test(text) && text.length == 0)) {
    form.setFieldError(
      'name',
      'Name must have at least 2 letters and only contain letters',
    )
    return ''
  }

  const words = text.split(/[^A-Za-z]+/)
  if (words.length > 1 && words[1].length > 0) {
    text = words[0][0] + words[1][0]
  } else {
    text = words[0][0] + words[0][1]
  }

  form.clearFieldError('name')
  return text.toUpperCase()
})

// todo fetch placeholder values from database as from register..............................
export function Profile() {
  form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      name: '',
      email: '',
      upiId: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      upiId: (value) =>
        /[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}/.test(value) ? null : 'Invalid UPI ID',
    },
  })

  const [name, setName] = useAtom(nameAtom)
  const [avatarText] = useAtom(avatarAtom)
  const { data, isLoading, isError, isSuccess } = useUser()
  console.log(data)

  const navigate = useNavigate()
  // if (isLoading) return <div>Loading...</div>

  return (
    <Flex
      gap="xl"
      justify="center"
      align="center"
      direction="column"
      mx="auto"
      // wrap="wrap"
    >
      <center>
        <Title mt="sm" style={{ fontSize: 24, fontWeight: 700 }}>
          Profile
        </Title>
      </center>
      <Box sx={{ maxWidth: 270 }}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <form
        // onSubmit={form.onSubmit((values: any) =>
        //   mutate({ ...values, name: name, avatar: avatarText }),
        // )}
        >
          <center>
            <Avatar
              src={null}
              alt={avatarText}
              radius="xs"
              size="xl"
              color="sky"
            >
              {avatarText}
            </Avatar>
          </center>
          <TextInput
            label="Name"
            placeholder="Full Name"
            {...form.getInputProps('name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            mt="sm"
            label="Email"
            placeholder="Email"
            {...form.getInputProps('email')}
          />
          <TextInput
            mt="sm"
            label="UPI ID"
            placeholder="UPI ID"
            {...form.getInputProps('upiId')}
          />
          <Group position="center" mt="md">
            <Button disabled={isLoading} type="submit" style={{ width: 270 }}>
              Save Changes
            </Button>
          </Group>
        </form>
      </Box>
    </Flex>
  )
}
