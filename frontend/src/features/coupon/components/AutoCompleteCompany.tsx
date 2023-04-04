import { Text, Group, Avatar, Autocomplete } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { forwardRef, useState } from 'react'
import { companiesKey, useCompanies } from '../api/autoCompleteCompany'
import { CompanyDTO } from '../types'

const CompanyAutoCompleteItem = forwardRef<HTMLDivElement, CompanyDTO>(
  ({ name, value, logo, domain, ...others }: CompanyDTO, ref) => (
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
  companies: CompanyDTO[] | undefined
  companyName: string
  setCompanyName: any
}

export function AutoCompleteCompany({ companyName, setCompanyName, companies }: companyProps) {
  const queryClient = useQueryClient()
  return (
    <Autocomplete
      label="Company"
      placeholder="Select a Company"
      itemComponent={CompanyAutoCompleteItem}
      value={companyName}
      onChange={(e) => setCompanyName(e)}
      onBlur={() => queryClient.invalidateQueries(companiesKey)}
      data={companies ?? []}
      limit={4}
      mt="sm"
    />
  )
}
