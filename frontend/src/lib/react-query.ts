import { AxiosError } from 'axios'
import {
  QueryClient,
  UseQueryOptions,
  UseMutationOptions,
  DefaultOptions,
} from '@tanstack/react-query'
// import { PromiseValue } from 'type-fest';

const queryConfig: DefaultOptions = {
  queries: {
    // useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<Awaited<ReturnType<QueryFnType>>>,
  'queryKey' | 'queryFn'
>

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  Awaited<ReturnType<MutationFnType>>,
  AxiosError,
  Parameters<MutationFnType>[0]
>
