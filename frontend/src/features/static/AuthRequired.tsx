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

export function AuthRequired() {
  const { classes } = useStyles()
  const navigate = useNavigate()

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>Authentication Required</Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            Hello there! Thank you for visiting our website. It seems that the
            page you are trying to access requires you to login first. Please
            login with your username and password to proceed. If you do not have
            an account, you can click on the registration link to create one. If
            you have any difficulties logging in or registering, please let us
            know by contacting our support team. Thank you for choosing our
            website!
          </Text>
          <Group position="center">
            <Button onClick={(e) => navigate('/auth/login')} size="md">
              Login
            </Button>
            <Button onClick={(e) => navigate('/')} size="md">
              Back to Home Page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  )
}
