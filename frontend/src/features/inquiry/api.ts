import { axios } from 'lib/axios'
import { MutationConfig, queryClient, QueryConfig } from 'lib/react-query'
import { useQuery, useMutation } from '@tanstack/react-query'
import { showSuccess } from 'lib/notifications'

export type CreateInquiryDTO = {
  title: string
  description: string
}

export type InquiryDTO = {
  _id: string
  title: string
  description: string
  avatar: string
  userid: string
  username: string
  createdAt: string
}

const inquiryKey = ['inquiry']

const createInquiry = (data: CreateInquiryDTO): Promise<any> => {
  console.log(data)
  return axios.post('/inquiry/add', data)
}

type UseCreateInquiryOptions = {
  config?: MutationConfig<typeof createInquiry>
}

export const useCreateInquiry = ({ config }: UseCreateInquiryOptions = {}) => {
  return useMutation({
    onMutate: async (newInquiry: CreateInquiryDTO) => {
      await queryClient.cancelQueries(inquiryKey)

      const previousInquiries = queryClient.getQueryData<any[]>(inquiryKey)

      queryClient.setQueryData(inquiryKey, [
        ...(previousInquiries || []),
        newInquiry,
      ])

      return { previousInquiries }
    },
    onError: (context: any) => {
      if (context?.previousInquiries) {
        queryClient.setQueryData(inquiryKey, context.previousInquiries)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(inquiryKey)
      showSuccess('Inquiry Added')
    },
    ...config,
    mutationFn: createInquiry,
  })
}

const getInquiries = (): Promise<InquiryDTO[]> => {
  return axios.get('/inquiry/all')
}

type QueryFnType = typeof getInquiries

type UseInquiriesOptions = {
  config?: QueryConfig<QueryFnType>
}

export const useInquiries = ({ config }: UseInquiriesOptions = {}) => {
  return useQuery<Awaited<ReturnType<QueryFnType>>>({
    ...config,
    queryKey: inquiryKey,
    queryFn: () => getInquiries(),
  })
}
