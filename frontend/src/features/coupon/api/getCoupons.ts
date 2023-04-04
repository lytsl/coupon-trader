import { axios } from 'lib/axios'
import { QueryConfig } from 'lib/react-query'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { CouponDTO, isCouponDTOList } from '../types'

const couponsKey = ['coupons']
const LIMIT = 12

const getCoupons = async (page: number): Promise<{ coupons: CouponDTO[]; hasMore: boolean }> => {
  console.log(page)
  return axios.get(`/coupon/findall`, {
    params: { page: page, limit: 3 },
  })
}

type CouponsFnType = typeof getCoupons

type UseCouponsOptions = {
  config?: QueryConfig<CouponsFnType>
}

export const useCoupons = ({ config }: UseCouponsOptions = {}) => {
  // return useQuery<Awaited<ReturnType<CouponsFnType>>>({
  //   ...config,
  //   queryKey: couponsKey,
  //   queryFn: () => getCoupons(),
  // })
  return useInfiniteQuery(couponsKey, ({ pageParam = 1 }) => getCoupons(pageParam), {
    getNextPageParam: (lastPage, allPages) => (lastPage.hasMore ? allPages.length + 1 : undefined),
  })
}
