import {
  createStyles,
  Navbar as MantineNavbar,
  Flex,
  Box,
  rem,
} from '@mantine/core'
import { CouponCard } from './CouponCard'

const useStyles = createStyles((theme) => ({
  grid: {
    margin: '0 auto',
    display: 'grid',
    gap: rem(16),
    [theme.fn.largerThan('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.fn.largerThan('md')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
}))

const data: number[] = []

export function Explore() {
  const { classes } = useStyles()

  for (let i = 0; i < 50; i++) data.push(i)

  const cards = data.map((item) => <CouponCard />)

  return (
    <Flex
      gap="xl"
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap="wrap"
    >
      {/* <MantineNavbar ></MantineNavbar> */}
      <Box
        py="md"
        sx={{ flex: 1, minHeight: '100svh' }}
        className={classes.grid}
      >
        {cards}
      </Box>
    </Flex>
  )
}
