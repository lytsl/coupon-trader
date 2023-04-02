import { axios } from 'lib/axios'
import { MutationConfig, queryClient } from 'lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { showSuccess } from 'lib/notifications'
import { AxiosError } from 'axios'

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

const couponsKey = ['coupons']

export const createCoupon = (data: CreateCouponDTO): Promise<CouponDTO> => {
  console.log(data)
  return axios.post('/coupon/create', data)
}

type UseCreateCouponOptions = {
  config?: MutationConfig<typeof createCoupon>
}

export const useCreateCoupon = ({ config }: UseCreateCouponOptions = {}) => {
  return useMutation<CouponDTO, AxiosError, CreateCouponDTO>({
    onMutate: async (newCoupon: CreateCouponDTO) => {
      await queryClient.cancelQueries(couponsKey)

      const previousCoupons = queryClient.getQueryData<CouponDTO[]>(couponsKey)

      queryClient.setQueryData(couponsKey, [
        ...(previousCoupons || []),
        newCoupon,
      ])

      return { previousCoupons }
    },
    onError: (context: any) => {
      if (context?.previousCoupons) {
        queryClient.setQueryData(couponsKey, context.previousCoupons)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(couponsKey)
      showSuccess('Coupon Created')
    },
    ...config,
    mutationFn: createCoupon,
  })
}
