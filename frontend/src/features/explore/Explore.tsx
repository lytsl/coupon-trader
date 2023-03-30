import {
  createStyles,
  Navbar as MantineNavbar,
  Flex,
  Box,
  rem,
  ScrollArea,
  TextInput,
  Checkbox,
} from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import { HEADER_HEIGHT } from 'components/Header'
import { useState } from 'react'
import { CouponCard } from './CouponCard'
import { ExploreNavbar } from './ExploreNavbar'

const useStyles = createStyles((theme) => ({
  navbar: {
    height: '80svh',
    width: rem(270),
    position: 'sticky',
    top: `${HEADER_HEIGHT}`,
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
const companies: string[] = [
  'PhonePay',
  'PayTm',
  'GooglePay',
  'Swiggy',
  'Zomato',
  'Airtel',
]

export function Explore() {
  const { classes } = useStyles()
  const [value, setValue] = useState('')
  const [debounced] = useDebouncedValue(value, 200)

  for (let i = 0; i < 50; i++) data.push(i)

  const cards = data.map((item) => <CouponCard />)
  const companyCheckBox = companies.map((item) => (
    <Checkbox value={item} label={item} key={item} />
  ))

  return (
    <Flex justify="flex-start" align="flex-start" direction="row" wrap="nowrap">
      <ExploreNavbar />
      <Box
        py="xl"
        px="lg"
        sx={{ flex: 1, minHeight: '100svh' }}
        className={classes.grid}
      >
        {cards}
      </Box>
    </Flex>
  )
}
