import {
  Card,
  Image,
  Text,
  Group,
  createStyles,
  rem,
  Box,
  Flex,
  Space,
  Avatar,
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.blue[6],
    maxHeight: rem(150),
  },

  companyName: {
    writingMode: 'sideways-lr',
    fontFamily: 'Righteous, Helvetica',
    textAlign: 'center',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
  },

  title: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  circle1: {
    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.white,
    width: rem(24),
    height: rem(24),
    borderRadius: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: rem(-12),
  },
  circle2: {
    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.white,
    width: rem(24),
    height: rem(24),
    borderRadius: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: rem(-8),
  },
}))

type CouponCardProps = {
  props: {
    _id: string
    company: string
    companylogo: string
    title: string
    expirydate: string
    price: number
  }
}

export function CouponCard({ props }: CouponCardProps) {
  const { classes } = useStyles()
  const navigate = useNavigate()

  return (
    //  <CustomFonts />
    // <Box>
    <Card
      onClick={(e) => navigate(`../coupon/${props._id}`)}
      radius="md"
      className={classes.card}
      p={0}
    >
      <Flex h="100%" justify="flex-start" align="stretch" direction="row" wrap="nowrap">
        <Box className={classes.companyName} bg="violet" pl={rem(12)} pr={rem(4)} py={rem(16)}>
          <Text fz="sm" className={classes.companyName} align="center" lts={rem(2)}>
            {props.company.toUpperCase()}
          </Text>
        </Box>
        <Flex
          justify="space-between"
          direction="column"
          mr={rem(12)}
          py={rem(16)}
          px={rem(16)}
          sx={{ flex: '1 1 0' }}
        >
          <Flex gap="md" justify="flex-start" align="flex-start" direction="row" wrap="nowrap">
            <Avatar
              mah={50}
              maw={50}
              // fit="contain"
              src={props.companylogo}
              alt={props.company}
            />

            <Text fz="lg" fw={600} className={classes.title}>
              {props.title}
            </Text>
          </Flex>
          <Flex justify={'space-between'} align="center" mt={rem(16)} wrap="nowrap">
            <Box>
              <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }}>
                Expires On
              </Text>
              <Text fz="md" fw={600} sx={{ lineHeight: 1 }} mt={rem(4)}>
                {props.expirydate}
              </Text>
            </Box>

            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              ₹{props.price}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box className={classes.circle1} />
      <Box className={classes.circle2} />
    </Card>
    // </Box>
  )
}
