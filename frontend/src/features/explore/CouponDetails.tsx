import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  rem,
  Center,
  Box,
  Flex,
  Button,
} from '@mantine/core'
import { IconHeart, IconBookmark, IconShare } from '@tabler/icons-react'
import { useParams } from 'react-router-dom'
import { useCouponDetails } from './api'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
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
  const { data, isLoading, error } = useCouponDetails({ couponId: id })

  if (error) {
    return <h1>An Error ouccured</h1>
  }
  if (!data) {
    return <h1>Could not load details</h1>
  }

  return (
    <Center>
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section mb="sm">
          <Image
            // src="https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            src={`/images/${bannerImages.electronics}`}
            alt={data.category}
            height="30svh"
          />
        </Card.Section>

        <Badge>{data.category}</Badge>

        <Text fw={700} className={classes.title} mt="xs">
          {data.title}
        </Text>

        <Flex
          justify={'space-between'}
          align="center"
          mt={rem(16)}
          wrap="nowrap"
        >
          <Box>
            <Text fz="sm" c="dimmed" fw={600} lh="1">
              Expires On
            </Text>
            <Text fz="md" fw={600} lh="1" mt={rem(4)}>
              {data.expirydate}
            </Text>
          </Box>

          <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
            ₹{data.price}
          </Text>
        </Flex>

        <Flex justify={'space-between'} align="center" mt={rem(16)}>
          <Group>
            <Avatar src={data.companylogo} radius="sm" />
            <Text fw={500}>{data.seller.username}</Text>
          </Group>

          <Button uppercase>Buy</Button>
        </Flex>

        <Card.Section className={classes.footer}>
          <Text fw={700} className={classes.title}>
            Terms & Conditions
          </Text>
          <Text fz="md">{data.terms}</Text>
        </Card.Section>
      </Card>
    </Center>
  )
}
