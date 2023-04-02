import { axios } from 'lib/axios'
import { QueryConfig } from 'lib/react-query'
import { useQuery } from '@tanstack/react-query'
import { CouponDTO } from '../types'

const couponsKey = ['coupons']

const getCoupons = (): Promise<CouponDTO[]> => {
  return axios.get(`/coupon/findall`)
}

type CouponsFnType = typeof getCoupons

type UseCouponsOptions = {
  config?: QueryConfig<CouponsFnType>
}

export const useCoupons = ({ config }: UseCouponsOptions = {}) => {
  return useQuery<Awaited<ReturnType<CouponsFnType>>>({
    ...config,
    queryKey: [couponsKey],
    queryFn: () => getCoupons(),
  })
}
