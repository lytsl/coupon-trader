import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  Group,
} from '@mantine/core'
import { useLogout } from 'lib/auth'
import storage from 'lib/storage'
import { useNavigate } from 'react-router-dom'
import { Illustration } from './components/Illustration404'

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  inner: {
    position: 'relative',
  },

  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 0,
    opacity: 0.75,
  },

  content: {
    paddingTop: theme.spacing.sm,
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: theme.spacing.xs,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 30,
    },
  },

  description: {
    maxWidth: 540,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}))

export function NotFoundAuth() {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const { mutate: logout, isLoading, isError, isSuccess } = useLogout()
  if (isSuccess) {
    navigate('/')
    return <div>Success</div>
  }

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        {/* <Illustration className={classes.image} /> */}
        <div className={classes.content}>
          <Title className={classes.title}>Already Logged In</Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            You seem to have already logged in. If you are experiencing
            difficulties logging into your account, please check your account
            settings or try refreshing the page. If you want to sign in to a
            different account, you can also log out of your existing account.
          </Text>
          <Group position="center">
            <Button disabled={isLoading} onClick={(e) => logout()} size="md">
              Logout
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  )
}
