import {
  createStyles,
  Navbar as MantineNavbar,
  Flex,
  rem,
  ScrollArea,
  TextInput,
  Checkbox,
} from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { HEADER_HEIGHT } from 'components/Header'
import { useState } from 'react'

const useStyles = createStyles((theme) => ({
  navbar: {
    height: '80svh',
    width: rem(240),
    position: 'sticky',
    top: `${HEADER_HEIGHT}`,
  },
}))

const data: number[] = []
const companies: string[] = [
  'PhonePay',
  'PayTm',
  'GooglePay',
  'Swiggy',
  'Zomato',
  'Airtel',
]

export function ExploreNavbar() {
  const { classes } = useStyles()
  const [navbarState, setNavbarState] = useState<{
    query: string
    list: string[]
  }>({
    query: '',
    list: companies,
  })
  const handleChange = (e: any) => {
    const result = companies.filter((company) => {
      if (e.target.value === '') return companies
      return company.toLocaleLowerCase().includes(e.target.value.toLowerCase())
    })
    setNavbarState({ query: e.target.value, list: result })
  }

  const companyCheckBox = navbarState.list.map((item) => (
    <Checkbox value={item} label={item} key={item} />
  ))

  return (
    <MantineNavbar className={classes.navbar}>
      <MantineNavbar.Section p="md" grow>
        <TextInput
          placeholder="Company"
          size="xs"
          value={navbarState.query}
          onChange={handleChange}
          icon={<IconSearch size="0.8rem" stroke={1.5} />}
          mb="sm"
        />
        <ScrollArea h="50svh" type="auto" scrollbarSize={4}>
          <Checkbox.Group>
            <Flex
              gap="sm"
              align="stretch"
              justify="flex-start"
              direction="column"
              mt="xs"
            >
              {companyCheckBox}
            </Flex>
          </Checkbox.Group>
        </ScrollArea>
      </MantineNavbar.Section>
    </MantineNavbar>
  )
}
