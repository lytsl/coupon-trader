import {
  createStyles,
  Navbar as MantineNavbar,
  Flex,
  Box,
  rem,
  Text,
} from '@mantine/core'
import { CouponCard } from './CouponCard'

const useStyles = createStyles((theme) => ({
  navbar: {
    height: 585,
    width: rem(270),
  },

  grid: {
    margin: '0 auto',
    display: 'grid',
    gap: `${rem(32)} ${rem(24)}`,
    [theme.fn.largerThan(rem(900))]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.fn.largerThan(rem(1200))]: {
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
      wrap="nowrap"
    >
      <MantineNavbar className={classes.navbar}>
        <MantineNavbar.Section grow>
          <Text>filter</Text>
        </MantineNavbar.Section>
      </MantineNavbar>
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
