import { useQuery } from '@tanstack/react-query'
import { axios } from 'lib/axios'
import { QueryConfig } from 'lib/react-query'
import { CouponDetailsDTO } from '../types'

const couponKey = ['coupon']

const getCouponDetails = ({ couponId }: { couponId: string }): Promise<CouponDetailsDTO> => {
  return axios.get(`/coupon/${couponId}`)
}

type CouponDetailsFnType = typeof getCouponDetails

type UseCouponDetailsOptions = {
  couponId: string
  config?: QueryConfig<CouponDetailsFnType>
}

export const useCouponDetails = ({ couponId, config }: UseCouponDetailsOptions) => {
  return useQuery<Awaited<ReturnType<CouponDetailsFnType>>>({
    ...config,
    queryKey: [couponKey, couponId],
    queryFn: () => getCouponDetails({ couponId }),
  })
}
