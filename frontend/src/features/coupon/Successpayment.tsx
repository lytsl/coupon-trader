import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  rem,
  CopyButton,
  Tooltip,
  ActionIcon,
} from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'

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
    color: theme.colorScheme === 'dark' ? theme.colors.green : theme.colors.green[4],

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

export function Successpayment() {
  const { classes } = useStyles()

  return (
    <Container className={classes.root}>
      <div className={classes.label}>SUCCESS</div>
      <Title className={classes.title}>Your payment has been successfully done.</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        Congratulations! Your payment has been successfully processed. Thank you for choosing our
        services. If you have any questions or concerns, please don't hesitate to contact us. Thank
        you again for your trust and support.
      </Text>

      <Group position="center">
        <Text size="xl" color="">
          <b>Coupon Code : XJANKJBA68654AB</b>
        </Text>
        <CopyButton value="" timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
              <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Group>
      <Group position="center" style={{ marginTop: 20 }}>
        <Button variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  )
}
