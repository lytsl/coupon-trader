import { useMutation, useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { showSuccess } from "lib/notifications";
import { MutationConfig, queryClient } from "lib/react-query";
import { OwnedCouponDTO } from "../types";

const couponKey = ['coupon']

export const verifyPayment = (token: string): Promise<any> =>
  axios.get('/payment/verify_payment', { params: { verify_payment_token: token } })

  type UseUpdateCouponOptions = {
    config?: MutationConfig<typeof verifyPayment>
  }

export const useVerifyPayment = (token: string) => {
    return useQuery(
      [...couponKey, token],
      async () => {
        const response = await verifyPayment(token)
        return response
      },
  
      {
        staleTime: Infinity,
        cacheTime: Infinity,
        onSuccess: (data) => showSuccess('Your payment was verified successfully'),
      },
    )
  }