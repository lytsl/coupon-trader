import { QueryConfig } from 'lib/react-query'
import { useQuery } from '@tanstack/react-query'
import { CompanyDTO, CompanyResponseDTO } from '../types'
import { CLEARBIT_KEY } from 'lib/config'
import { axios } from 'lib/axios'

export const companiesKey = ['company']

const getCompanies = (query: string): Promise<CompanyResponseDTO[]> => {
  return axios.get(`/coupon/company/${query}`)
}

export const useCompanies = (query: string) => {
  return useQuery(
    [companiesKey, query],
    async () => {
      const response = await getCompanies(query)
      const companies = response.map((item) => ({ ...item, value: item.name } as CompanyDTO))
      return companies
    },
    {
      enabled: query.length > 2,
      staleTime: 4 * (60 * 1000),
    },
  )
}
