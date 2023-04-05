import { axios } from 'lib/axios'
import { QueryConfig } from 'lib/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'
import { OwnedCouponDTO } from '../types'

const couponsKey = 'coupons'
const LIMIT = 12

const getCoupons = async (
  page: number,
  category: string,
): Promise<{ coupons: OwnedCouponDTO[]; hasMore: boolean; totalCount: number }> => {
  console.log(page)
  return axios.get(`/coupon/findall`, {
    params: { page: page, limit: LIMIT, ...(category !== 'all' && { category: category }) },
  })
}

type CouponsFnType = typeof getCoupons

type UseCouponsOptions = {
  config?: QueryConfig<CouponsFnType>
}

export const useCoupons = (category: string) => {
  // return useQuery<Awaited<ReturnType<CouponsFnType>>>({
  //   ...config,
  //   queryKey: couponsKey,
  //   queryFn: () => getCoupons(),
  // })
  return useInfiniteQuery(
    [couponsKey, category],
    ({ pageParam = 1 }) => getCoupons(pageParam, category),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasMore ? allPages.length + 1 : undefined,
    },
  )
}
