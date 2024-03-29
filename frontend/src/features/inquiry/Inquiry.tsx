import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  createStyles,
  rem,
  Container,
  Text,
  Center,
  Loader,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import storage from 'lib/storage'
import { useNavigate } from 'react-router-dom'
import { CreateInquiryDTO, InquiryDTO, useCreateInquiry, useInquiries } from './api'
import { Comment } from './Comment'

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 470,
    position: 'relative',
    minWidth: 370,
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}))

export function Inquiry() {
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
    } as CreateInquiryDTO,
    validate: {
      title: (value) => value.trim().length < 2,
    },
  })
  const { classes } = useStyles()
  const { mutate: createInquiry, isLoading } = useCreateInquiry()
  const { data: inquiriesData, error, isLoading: loadingInquiries } = useInquiries()
  const auth = storage.getToken() == null ? false : true
  const navigate = useNavigate()

  let inquiries
  if (inquiriesData) {
    inquiries = inquiriesData.map((inquiry) => (
      <Comment
        body={inquiry.description}
        author={{
          name: inquiry.title,
          username: inquiry.username,
          image: inquiry.avatar,
        }}
        key={inquiry._id}
      />
    ))
  } else if (loadingInquiries) {
    inquiries = (
      <Center>
        <Loader />
      </Center>
    )
  } else if (error) {
    inquiries = (
      <Center>
        <Text>Failed to get inquires</Text>
      </Center>
    )
  }

  return (
    <>
      <Title
        order={2}
        size="h1"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        })}
        weight={900}
        align="center"
        style={{ marginTop: 60 }}
      >
        Inquiry Here
      </Title>
      <SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Container className={classes.wrapper} style={{ marginRight: 50, marginLeft: 50 }}>
          <form onSubmit={form.onSubmit((values: CreateInquiryDTO) => createInquiry(values))}>
            <TextInput
              label="Name Of Required Coupon"
              placeholder="Name"
              name="name"
              variant="filled"
              size={'md'}
              {...form.getInputProps('title')}
            />

            <Textarea
              mt="md"
              label="Description"
              placeholder="Details Of Coupon"
              maxRows={10}
              minRows={5}
              name="message"
              variant="filled"
              {...form.getInputProps('description')}
            />

            <Group position="center" mt="xl">
              {auth ? (
                <Button disabled={isLoading} type="submit" size="md">
                  Send message
                </Button>
              ) : (
                <Button onClick={(e) => navigate('/auth/login')} size="md">
                  Login to add inquiries
                </Button>
              )}
            </Group>
          </form>
        </Container>
        <Container className={classes.wrapper}>{inquiries}</Container>
      </SimpleGrid>
    </>
  )
}
