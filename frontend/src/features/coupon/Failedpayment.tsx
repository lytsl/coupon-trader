import { createStyles, Title, Text, Button, Container, Group, rem } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: 'center',
    fontWeight: 500,
    fontSize: rem(175),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colorScheme === 'dark' ? theme.colors.red : theme.colors.red[4],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}))

export function Failedpayment() {
  const { classes } = useStyles()

  return (
    <Container className={classes.root}>
      <div className={classes.label}>FAILED!</div>
      <Title className={classes.title}>Your payment has been Failed.</Title>
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
