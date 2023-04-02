import { useMutation } from '@tanstack/react-query'
import { axios } from 'lib/axios'
import { MutationConfig, queryClient } from 'lib/react-query'
import { PaymentDTO, PaymentLinkDTO } from '../types'
import { showSuccess } from 'lib/notifications'

const tempKey = 'coupon'

const makePayment = (data: PaymentDTO): Promise<PaymentLinkDTO> => {
  console.log(data)
  return axios.post('/payment/create-checkout-session', data)
}

type UseMakePaymentOptions = {
  config?: MutationConfig<typeof makePayment>
}

export const useMakePayment = ({ config }: UseMakePaymentOptions = {}) => {
  return useMutation({
    onMutate: async (newPayment: PaymentDTO) => {
      await queryClient.cancelQueries([tempKey, newPayment.couponid])
      const previousPayment = queryClient.getQueryData<PaymentLinkDTO>([
        tempKey,
        newPayment.couponid,
      ])
      queryClient.setQueryData([tempKey, newPayment.couponid], {
        ...previousPayment,
        ...newPayment,
        id: newPayment,
      })
      return { previousPayment }
    },
    onError: (context: any) => {
      if (context?.previousPayment) {
        queryClient.setQueryData([tempKey, context.previousPayment.id], context.previousPayment)
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([tempKey, data.couponid])
      //   showSuccess('Payment Successfull')
    },
    ...config,
    mutationFn: makePayment,
  })
}
