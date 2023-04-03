import { Text, Group, Avatar, Autocomplete } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { forwardRef, useState } from 'react'
import { useCompanies } from '../api/autoCompleteCompany'
import { CompanyProps } from '../types'

const CompanyAutoCompleteItem = forwardRef<HTMLDivElement, CompanyProps>(
  ({ name, value, logo, domain, ...others }: CompanyProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={logo} />
        <div>
          <Text>{value}</Text>
          <Text size="xs" color="dimmed">
            {domain}
          </Text>
        </div>
      </Group>
    </div>
  ),
)

type companyProps = {
  company: string
  setCompany: any
}

export function AutoCompleteCompany({ company, setCompany }: companyProps) {
  const [query] = useDebouncedValue(company, 300)
  const { data } = useCompanies(query)

  return (
    <Autocomplete
      label="Company"
      placeholder="Select a Company"
      itemComponent={CompanyAutoCompleteItem}
      value={company}
      onChange={(e) => setCompany(e)}
      data={data ?? []}
      limit={4}
      mt="sm"
    />
  )
}
function useDebounce(company: string, arg1: number) {
  throw new Error('Function not implemented.')
}
