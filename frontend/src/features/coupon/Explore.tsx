import { createStyles, Flex, Box, rem, Checkbox, Center, Loader } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { HEADER_HEIGHT } from 'components/Header'
import { useState } from 'react'
import { useCoupons } from './api/getCoupons'
import { CouponCard } from './components/CouponCard'
import { ExploreNavbar } from './components/ExploreNavbar'

const useStyles = createStyles((theme) => ({
  navbar: {
    height: '80svh',
    width: rem(270),
    position: 'sticky',
    top: `${HEADER_HEIGHT}`,
  },

  grid: {
    flex: 1,
    minHeight: '100svh',
    margin: '0 auto',
    display: 'grid',
    gridAutoRows: '1fr',
    gap: `${rem(32)} ${rem(24)}`,
    [theme.fn.largerThan(rem(900))]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.fn.largerThan(rem(1200))]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
}))

const companies: string[] = ['PhonePay', 'PayTm', 'GooglePay', 'Swiggy', 'Zomato', 'Airtel']

// FIXME: set proper UI
export function Explore() {
  const { classes } = useStyles()
  const [value, setValue] = useState('')
  const [debounced] = useDebouncedValue(value, 200)

  const { data, isLoading, error } = useCoupons()

  if (isLoading) {
    return (
      <Center>
        <Loader></Loader>
      </Center>
    )
  }
  if (error) {
    return <h1>An Error ouccured</h1>
  }
  if (!data) {
    return <h1>Could not load details</h1>
  }

  const cards = data.map((item) => <CouponCard props={item} key={item._id} />)

  return (
    <Flex justify="flex-start" align="flex-start" direction="row" wrap="nowrap">
      <ExploreNavbar />
      <Box py="xl" px="lg" className={classes.grid}>
        {cards}
      </Box>
    </Flex>
  )
}
