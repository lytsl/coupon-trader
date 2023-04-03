import { createStyles, Title, Text, Button, Container, Group, rem } from '@mantine/core'
import { IconExclamationCircle } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    fontFamily: 'monsterrat',
    textAlign: 'center',
    fontWeight: 800,
    fontSize: rem(100),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colorScheme === 'dark' ? theme.colors.green : theme.colors.green[4],
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(70),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 600,
    fontSize: rem(32),
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}))

export function FailedPayment() {
  const { classes } = useStyles()

  return (
    <Container className={classes.root}>
      <div className={classes.label}>FAILED!</div>
      <Group position="center">
        <IconExclamationCircle size={50} stroke={1.5} />
        <Title className={classes.title}>Your payment has been Failed.</Title>
      </Group>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        We're sorry to inform you that your payment was not successful. There may have been an issue
        with your payment method or some other technical error. Please check your payment details
        and try again, or contact your financial institution for further assistance.
      </Text>
      <Group position="center">
        <Button variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  )
}
