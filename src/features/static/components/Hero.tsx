import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
} from '@mantine/core'
import image from './image.svg'

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },
  content: {
    maxWidth: 540,
    marginRight: theme.spacing.xl * 3,
    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,
    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },
  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },
  image: {
    alignSelf: 'center',
    flex: 1,
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}))

export function Hero() {
  const { classes } = useStyles()
  return (
    <div>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Join <span className={classes.highlight}>Coupon Trader</span>
              <br /> Trade Your Unused Coupon Today
            </Title>
            <Text color="dimmed" mt="md">
              Looking to sell your unused coupons? Join Coupon Trader and take
              advantage of our user-friendly platform, multiple payment options,
              and dedicated customer support team. With our secure system, you
              can easily turn your unused coupons into valuable resources. Don't
              let those unwanted coupons go to waste - join our community today
              and start trading with confidence!
            </Text>

            <Group mt={30}>
              <Button radius="md" size="lg" className={classes.control}>
                Get started
              </Button>
            </Group>
          </div>
          <Image src={image} className={classes.image} />
        </div>
      </Container>
    </div>
  )
}
