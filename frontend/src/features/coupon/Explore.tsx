import { createStyles, Flex, Box, rem, Checkbox, Center, Loader, Group } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { HEADER_HEIGHT } from 'components/Header'
import { Fragment, useState } from 'react'
import { useCoupons } from './api/getCoupons'
import { CouponCard } from './components/CouponCard'
import { ExploreNavbar } from './components/ExploreNavbar'
import useInfiniteScroll from 'react-infinite-scroll-hook'
// import InfiniteScroll from 'react-infinite-scroller'

const useStyles = createStyles((theme) => ({
  navbar: {
    height: '80svh',
    width: rem(270),
    position: 'sticky',
    top: `${HEADER_HEIGHT}`,
  },

  gridContainer: {
    flex: 1,
    minHeight: '100svh',
    margin: '0 auto',
  },

  grid: {
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

// FIXME: set proper UI
export function Explore() {
  const { classes } = useStyles()
  const [value, setValue] = useState('')
  const [debounced] = useDebouncedValue(value, 200)

  // const { data, isLoading, error } = useCoupons()
  const { data, error, isSuccess, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useCoupons()
  const [sentryRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: hasNextPage ?? false,
    onLoadMore: fetchNextPage,
    disabled: !!error,
    // || isFetchingNextPage || !(hasNextPage ?? false),
    rootMargin: '0px 0px 400px 0px',
  })

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
    return <h1>Could not load Coupons</h1>
  }

  return (
    <Flex justify="flex-start" align="flex-start" direction="row" wrap="nowrap">
      <ExploreNavbar />
      <Box className={classes.gridContainer}>
        <Box py="xl" px="lg" className={classes.grid}>
          {data.pages.map((group, i) => (
            <Fragment key={i}>
              {group.coupons.map((coupon) => (
                <CouponCard props={coupon} key={coupon._id} />
              ))}
            </Fragment>
          ))}
        </Box>
        {(isFetchingNextPage || hasNextPage) && (
          <Box w={'100%'} ref={sentryRef}>
            <Center>
              <Loader />
            </Center>
          </Box>
        )}
      </Box>
    </Flex>
  )
}
