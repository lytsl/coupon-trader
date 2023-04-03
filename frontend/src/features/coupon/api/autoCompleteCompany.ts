import { QueryConfig } from 'lib/react-query'
import { useQuery } from '@tanstack/react-query'
import { CompanyProps, CompanyResponseDTO } from '../types'
import { CLEARBIT_KEY } from 'lib/config'
import { axios } from 'lib/axios'

const companiesKey = ['company']

const getCompanies = (query: string): Promise<CompanyResponseDTO[]> => {
  return axios.get(`/coupon/company/${query}`)
}

export const useCompanies = (query: string) => {
  return useQuery(
    [companiesKey, query],
    async () => {
      const response = await getCompanies(query)
      const companies = response.map((item) => ({ ...item, value: item.name } as CompanyProps))
      return companies
    },
    {
      enabled: !!query,
    },
  )
}
