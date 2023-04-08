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
  Center,
  Loader,
} from '@mantine/core'
import { IconCheck, IconCopy, IconDiscountCheckFilled } from '@tabler/icons-react'
import { useCouponDetails } from 'features/coupon/api/getCouponDetails'
import { useVerifyPayment } from 'features/coupon/api/verifyPayment'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

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

export function SuccessPayment() {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  let token = searchParams.get('token')
  let code = searchParams.get('code')
  if (!token || !code) {
    return <h1>Bad Request</h1>
  }
  token = token.replace(/%dot%/g, '.')
  const { data, isLoading: isPaymentLoading, error: paymentError } = useVerifyPayment(token)

  // const {
  //   data: couponData,
  //   isLoading: isCouponLoading,
  //   error: couponError,
  // } = useCouponDetails({ couponId: coupon_id })
  if (isPaymentLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }
  if (paymentError) {
    return <h1>An Error ouccured</h1>
  }

  console.log(code)
  console.log(data)

  return (
    <Container className={classes.root}>
      <div className={classes.label}>SUCCESS</div>
      <Group position="center">
        <IconDiscountCheckFilled size={50} stroke={1.5} />
        <Title className={classes.title}>Your payment has been successfully done.</Title>
      </Group>

      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        Congratulations! Your payment has been successfully processed. If you have any questions or
        concerns, please don't hesitate to contact us. Thank you for your trust and support.
      </Text>

      <Group position="center">
        <Text size="xl" color="">
          <b>Coupon Code : {code}</b>
        </Text>
        <CopyButton value={code} timeout={2000}>
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
        <Button onClick={(e) => navigate('/')} variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  )
}
