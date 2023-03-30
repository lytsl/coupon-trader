import {
  createStyles,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
} from '@mantine/core'
import {
  IconTicket,
  IconShieldLock,
  IconWallet,
  IconHeartHandshake,
  IconZoomCheck,
  IconFriends,
} from '@tabler/icons-react'

const mockData = [
  {
    title: 'Wide Selection of Coupons',
    description:
      'Discover the best deals and discounts with our extensive range of coupons for your favorite brands and stores. Save big on your purchases with our vast selection of voucher codes and coupons.',
    icon: IconTicket,
  },
  {
    title: 'Safe and secure Transactions',
    description:
      'Shop with confidence knowing that all your transactions are safe and secure. Our website uses the latest encryption technologies to protect your personal and financial information.',
    icon: IconShieldLock,
  },
  {
    title: 'Convenient Payment Options',
    description:
      'We offer a variety of convenient payment options. Choose the option that works best for you and enjoy a seamless shopping experience.',
    icon: IconWallet,
  },
  {
    title: 'Customer Support',
    description:
      'Our dedicated customer support team is available to assist you with any questions or concerns you may have.',
    icon: IconHeartHandshake,
  },
  {
    title: 'Verified Coupons',
    description:
      'Trust that you are getting the best deals with our verified coupons.',
    icon: IconZoomCheck,
  },
  {
    title: 'User-Friendly',
    description:
      'Enjoy a hassle-free shopping experience with our user-friendly trading system. Buy and sell coupons with ease, and manage your account effortlessly.',
    icon: IconFriends,
  },
]

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}))

export function Features() {
  const { classes, theme } = useStyles()
  const features = mockData.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      p="xl"
    >
      <feature.icon size={50} stroke={1.4} color={theme.fn.primaryColor()} />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ))
  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} align="center" mt="sm">
        Convenient and Secure Voucher Trading with Verified Coupons
      </Title>

      <Text
        color="dimmed"
        className={classes.description}
        align="center"
        mt="md"
      >
        Shop with Confidence and Discover Incredible Deals on a Wide Range of
        Products and Services from Trusted Brands and Stores
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: 'md', cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  )
}
