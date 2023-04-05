import { createStyles, Flex, Box, rem, Checkbox, Center, Loader, Group } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { HEADER_HEIGHT } from 'components/Header'
import { Fragment, useCallback, useState } from 'react'
// import { CouponCard } from './components/CouponCard'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { AxiosError } from 'axios'
import { useUserCoupons } from '../api'
import { UserCouponCard } from './UserCoupon'
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

export function UserCouponsGrid() {
  const { classes } = useStyles()

  const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useUserCoupons('buy')

  const [sentryRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: hasNextPage ?? false,
    onLoadMore: fetchNextPage,
    disabled: !!error,
    // || isFetchingNextPage || !(hasNextPage ?? false),
    rootMargin: '0px 0px 400px 0px',
  })

  let couponGrid

  if (isLoading) {
    couponGrid = (
      <Center>
        <Loader></Loader>
      </Center>
    )
  } else if (error) {
    let errorMessage = 'No coupon were found'
    if (error instanceof AxiosError) {
      errorMessage = JSON.stringify(error.response?.data) || error.message
    }
    couponGrid = <h1>{errorMessage}</h1>
  } else if (!data) {
    couponGrid = <h1>Could not load Coupons</h1>
  } else {
    couponGrid = (
      <>
        <Box py="xl" px="lg" className={classes.grid}>
          {data.pages.map((group, i) => (
            <Fragment key={i}>
              {group.coupons.map((coupon) => {
                if (!!coupon.code) {
                  return (
                    <UserCouponCard props={{ ...coupon, code: coupon.code }} key={coupon._id} />
                  )
                }
              })}
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
      </>
    )
  }

  return (
    // <Flex justify="flex-start" align="flex-start" direction="row" wrap="nowrap">
    //   { <ExploreNavbar category={category} setCategory={handleCategoryChange} />
    <Box className={classes.gridContainer}>{couponGrid}</Box>
    // </Flex>
  )
}
