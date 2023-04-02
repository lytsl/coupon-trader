import { useQuery } from '@tanstack/react-query'
import { UserResponse } from 'features/auth/api'
import { CouponDTO } from 'features/coupon/api'
import { axios } from 'lib/axios'
import { QueryConfig } from 'lib/react-query'

export type CouponDetailsDTO = CouponDTO & {
  seller: Omit<UserResponse, 'accessToken'>
}

const couponKey = ['coupon']
const couponsKey = ['coupons']

const getCouponDetails = ({
  couponId,
}: {
  couponId: string
}): Promise<CouponDetailsDTO> => {
  return axios.get(`/coupon/${couponId}`)
}

const getCoupons = (): Promise<CouponDTO[]> => {
  return axios.get(`/coupon/findall`)
}

type CouponDetailsFnType = typeof getCouponDetails

type UseCouponDetailsOptions = {
  couponId: string
  config?: QueryConfig<CouponDetailsFnType>
}

export const useCouponDetails = ({
  couponId,
  config,
}: UseCouponDetailsOptions) => {
  return useQuery<Awaited<ReturnType<CouponDetailsFnType>>>({
    ...config,
    queryKey: [couponKey, couponId],
    queryFn: () => getCouponDetails({ couponId }),
  })
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
