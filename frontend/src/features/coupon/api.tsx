import { axios } from 'lib/axios'
import { MutationConfig, queryClient } from 'lib/react-query'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { showSuccess } from 'lib/notifications'

export type CreateCouponDTO = {
  code: string
  title: string
  terms: string
  expirydate: string
  price: number
  company: string
  companylogo: string
  category: string
}

export type CouponDTO = CreateCouponDTO & {
  sellerid: string
  couponverified: boolean
  _id: string
}

const couponKey = ['coupons']

export const createCoupon = (data: CreateCouponDTO): Promise<CouponDTO> => {
  return axios.post('/coupon/create', data)
}

type UseCreateCouponOptions = {
  config?: MutationConfig<typeof createCoupon>
}

export const useCreateCoupon = (
  { config }: any = {} as UseCreateCouponOptions,
) => {
  return useMutation({
    onMutate: async (newCoupon: CreateCouponDTO) => {
      await queryClient.cancelQueries(couponKey)

      const previousCoupons = queryClient.getQueryData<CouponDTO[]>(couponKey)

      queryClient.setQueryData(couponKey, [
        ...(previousCoupons || []),
        newCoupon,
      ])

      return { previousCoupons }
    },
    onError: (context: any) => {
      if (context?.previousCoupons) {
        queryClient.setQueryData(couponKey, context.previousCoupons)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(couponKey)
      showSuccess('Coupon Created')
    },
    ...config,
    mutationFn: createCoupon,
  })
}
