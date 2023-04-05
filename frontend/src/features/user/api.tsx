import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthUser, LoginDTO } from 'features/auth/api'
import { axios } from 'lib/axios'
import React from 'react'
import { QueryConfig } from 'lib/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'
import { CouponDTO } from 'features/coupon/types'

// const userKey = ['authenticated-user']

// export type UserUpdateDTO = {
//   email: string
//   username: string
// }

// const useLogin = () => {
//   const queryClient = useQueryClient()

//   const setUser = React.useCallback(
//     (data: AuthUser) => queryClient.setQueryData(userKey, data),
//     [queryClient],
//   )

//   return useMutation(async (data: UserUpdateDTO) => {
//     const response = await axios.put('/user/me', data)
//   })
// }

const couponsKey = 'coupons'
const LIMIT = 12

const getCoupons = async (
  page: number,
  couponType: string,
): Promise<{ coupons: CouponDTO[]; hasMore: boolean; totalCount: number }> => {
  console.log(page)
  return axios.get(`/coupon/${couponType}`, {
    params: { page: page, limit: LIMIT, coupon_type: couponType },
  })
}

type CouponsFnType = typeof getCoupons

type UseCouponsOptions = {
  config?: QueryConfig<CouponsFnType>
}

export const useUserCoupons = (couponType: string) => {
  // return useQuery<Awaited<ReturnType<CouponsFnType>>>({
  //   ...config,
  //   queryKey: couponsKey,
  //   queryFn: () => getCoupons(),
  // })
  return useInfiniteQuery(
    [couponsKey, couponType],
    ({ pageParam = 1 }) => getCoupons(pageParam, couponType),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasMore ? allPages.length + 1 : undefined,
    },
  )
}
