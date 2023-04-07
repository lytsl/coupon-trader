import { axios } from 'lib/axios'
import { MutationConfig, queryClient } from 'lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { showSuccess } from 'lib/notifications'
import { AxiosError } from 'axios'
import {  OwnedCouponDTO } from '../types'

const couponKey = 'coupon'

const updateCoupon = (data: OwnedCouponDTO): Promise<OwnedCouponDTO> => {
  console.log(data)
  return axios.put(`/coupon/${data._id}`, data)
}

type UseUpdateCouponOptions = {
  config?: MutationConfig<typeof updateCoupon>
}

export const useUpdateCoupon = ({ config }: UseUpdateCouponOptions = {}) => {
  return useMutation({
    onMutate: async (newCoupon: OwnedCouponDTO) => {
      await queryClient.cancelQueries([couponKey,newCoupon._id])

      const previousCoupons = queryClient.getQueryData<OwnedCouponDTO[]>([couponKey,newCoupon._id])

      queryClient.setQueryData([couponKey,newCoupon._id], {...previousCoupons, ...newCoupon})

      return { previousCoupons }
    },
    onError: (context: any) => {
      if (context?.previousCoupons) {
        queryClient.setQueryData([couponKey,context?.previousCoupons._id], context.previousCoupons)
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([couponKey,data._id])
      showSuccess('Coupon Updated')
    },
    ...config,
    mutationFn: updateCoupon,
  })
}
