import { axios } from 'lib/axios'
import { MutationConfig, queryClient } from 'lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { showSuccess } from 'lib/notifications'
import { AxiosError } from 'axios'
import { CreateCouponDTO, CouponDTO } from '../types'

const couponsKey = ['coupons']

const createCoupon = (data: CreateCouponDTO): Promise<CouponDTO> => {
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

      queryClient.setQueryData(couponsKey, [...(previousCoupons || []), newCoupon])

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
