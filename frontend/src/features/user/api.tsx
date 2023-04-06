import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthUser, LoginDTO } from 'features/auth/api'
import { axios } from 'lib/axios'
import React from 'react'
import { MutationConfig, QueryConfig, queryClient } from 'lib/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'
import { OwnedCouponDTO } from 'features/coupon/types'
import { showSuccess } from 'lib/notifications'

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

export const couponsKey = 'coupons'
const LIMIT = 12

const getCoupons = async (
  page: number,
  couponType: string,
): Promise<{ coupons: OwnedCouponDTO[]; hasMore: boolean; totalCount: number }> => {
  console.log(page)
  return axios.get(`/user/${couponType}`, {
    params: { page: page, limit: LIMIT },
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

const deleteCoupon = (id: string): Promise<string> => {
  return axios.delete(`/coupon/${id}`)
}

type UseDeleteCouponOptions = {
  config?: MutationConfig<typeof deleteCoupon>
}

export const useDeleteCoupon = ({ config }: UseDeleteCouponOptions = {}) => {
  return useMutation({
    onMutate: async (id: string) => {
      await queryClient.cancelQueries([couponsKey])

      const previousCoupons = queryClient.getQueryData<OwnedCouponDTO[]>([couponsKey])

      queryClient.setQueryData(
        [couponsKey],
        previousCoupons?.filter((discussion) => discussion._id !== id),
      )

      return { previousCoupons }
    },
    onError: (context: any) => {
      if (context?.previousCoupons) {
        queryClient.setQueryData([couponsKey], context.previousCoupons)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([couponsKey])
      showSuccess('Coupon Deleted')
    },
    ...config,
    mutationFn: deleteCoupon,
  })
}
