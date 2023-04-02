import {
  createStyles,
  Card,
  Image,
  Group,
  Text,
  Avatar,
  Badge,
  rem,
  Center,
  Box,
  Flex,
  Button,
  Loader,
  LoadingOverlay,
} from '@mantine/core'
import { useNavigate, useParams } from 'react-router-dom'
import { useCouponDetails } from './api/getCouponDetails'
import { useMakePayment } from './api/makePaymet'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    [theme.fn.largerThan('md')]: {
      width: '50svw',
      height: '100svh',
      margin: theme.spacing.lg,
    },
    [theme.fn.smallerThan('md')]: {
      margin: theme.spacing.sm,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}))

const bannerImages = {
  food: 'brooke-lark-lcZ9NxhOSlo-unsplash.jpg',
  electronics: 'christopher-gower-_aXa21cf7rY-unsplash.jpg',
  beauty: 'element5-digital-ceWgSMd8rvQ-unsplash.jpg',
  books: 'lilian-dibbern-GX1Dz9cZHc0-unsplash.jpg',
  travel: 'mantas-hesthaven-_g1WdcKcV3w-unsplash.jpg',
  toys: 'michal-bozek-RcxR1aLw8X0-unsplash.jpg',
  home: 'planetcare-23coWmkTNSg-unsplash.jpg',
  fashion: 'tamas-pap-N7lIJLtAegc-unsplash.jpg',
  medicine: 'towfiqu-barbhuiya-w8p9cQDLX7I-unsplash.jpg',
}

export function CouponDetails() {
  const { classes, theme } = useStyles()
  const { id } = useParams()
  if (!id) {
    return <h1>Bad Request</h1>
  }
  const { data: couponData, isLoading: isCouponLoading, error } = useCouponDetails({ couponId: id })
  const { mutate: payment, isLoading: isPaymentLoading, data: paymentLink } = useMakePayment()
  const navigate = useNavigate()

  if (isCouponLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }
  if (error) {
    return <h1>An Error ouccured</h1>
  }
  if (!couponData) {
    return <h1>Could not load details</h1>
  }
  if (paymentLink) {
    window.open(paymentLink.url, '_self')
    return (
      <Center>
        <Loader />
      </Center>
    )
  }

  return (
    <Center>
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section mb="sm">
          <Image
            // src="https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            src={`/images/${bannerImages.electronics}`}
            alt={couponData.category}
            height="30svh"
          />
        </Card.Section>

        <Badge>{couponData.category}</Badge>

        <Text fw={700} className={classes.title} mt="xs">
          {couponData.title}
        </Text>

        <Flex justify={'space-between'} align="center" mt={rem(16)} wrap="nowrap">
          <Box>
            <Text fz="sm" c="dimmed" fw={600} lh="1">
              Expires On
            </Text>
            <Text fz="md" fw={600} lh="1" mt={rem(4)}>
              {couponData.expirydate}
            </Text>
          </Box>

          <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
            ₹{couponData.price}
          </Text>
        </Flex>

        <Flex justify={'space-between'} align="center" mt={rem(16)}>
          <Group>
            <Avatar src={couponData.companylogo} radius="sm" />
            <Text fw={500}>{couponData.seller.username}</Text>
          </Group>
          <LoadingOverlay visible={isPaymentLoading} overlayBlur={2} />
          <Button onClick={(e) => payment({ couponid: id })} disabled={isPaymentLoading} uppercase>
            Buy
          </Button>
        </Flex>

        <Card.Section className={classes.footer}>
          <Text fw={700} className={classes.title}>
            Terms & Conditions
          </Text>
          <Text fz="md">{couponData.terms}</Text>
        </Card.Section>
      </Card>
    </Center>
  )
}
