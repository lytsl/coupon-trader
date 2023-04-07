import { useForm } from '@mantine/form'
import {
  Box,
  TextInput,
  Button,
  Group,
  Title,
  NumberInput,
  NativeSelect,
  Textarea,
  LoadingOverlay,
  Center,
  Loader,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useCreateCoupon } from './api/createCoupon'
import { CreateCouponDTO, OwnedCouponDTO } from './types'
import { useCallback, useState } from 'react'
import { categories } from './data'
import { AutoCompleteCompany } from './components/AutoCompleteCompany'
import { useCompanies } from './api/autoCompleteCompany'
import { useDebouncedValue } from '@mantine/hooks'
import { useUpdateCoupon } from './api/updateCoupon'
import { useParams } from 'react-router-dom'
import { useCouponDetails } from './api/getCouponDetails'

export function UpdateCoupon() {
  const { id } = useParams()
  if (!id) {
    return <h1>Bad Request</h1>
  }
  const {
    data: couponData,
    isLoading: isCouponLoading,
    error: couponDetailsError,
  } = useCouponDetails({ couponId: id })

  const form = useForm({
    // validateInputOnBlur: true,
    initialValues: {
      code: couponData?.code || '',
      title: couponData?.title || '',
      terms: couponData?.terms || '',
      // date: new Date(),
      expirydate: couponData?.expirydate || '',
      price: couponData?.price || 0,
      company: couponData?.company || '',
      companylogo: couponData?.companylogo || '',
      category: couponData?.category || 'other',
    } as OwnedCouponDTO,

    validate: {},
  })

  const [category, setCategory] = useState('other')

  const [companyName, setCompanyName] = useState('')
  const [query] = useDebouncedValue(companyName, 300)
  const { data: companiesData } = useCompanies(query)
  const { mutate: update, isLoading, data: couponResponse } = useUpdateCoupon()
  const handleCompanyChange = useCallback((value: string) => setCompanyName(value), [companyName])

  if (isCouponLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }
  if (couponDetailsError) {
    return <h1>An Error ouccured</h1>
  }
  if (!couponData) {
    return <h1>Could not load details</h1>
  }

  console.log(couponData)
  console.log(couponResponse)

  return (
    <>
      <center>
        <Title mt="sm" style={{ fontSize: 28, fontWeight: 900 }}>
          Update Coupon
        </Title>
      </center>
      <Box sx={{ maxWidth: 270 }} mx="auto" style={{ marginBottom: 30, marginTop: 30 }}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <form
          onSubmit={form.onSubmit((values: any) => {
            console.log(values)
            const company = companiesData?.find((cmp) => cmp.value == companyName)
            const coupon = {
              ...values,
              expirydate: values.date,
              company: companyName,
              companylogo: company?.logo ?? `/images/company-logo.jpg`,
              url: company?.domain ?? `https://www.google.com/search?q=${companyName}`,
              category: category,
            } as CreateCouponDTO
            console.log(coupon)
            update({ ...couponData, ...coupon })
          })}
        >
          <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
          <Textarea
            mt="sm"
            label="Terms"
            placeholder="Terms & Conditions"
            {...form.getInputProps('terms')}
          />
          <TextInput mt="sm" label="Code" placeholder="Code" {...form.getInputProps('code')} />
          {/* <TextInput
            mt="sm"
            label="Platform"
            placeholder="Platform"
            {...form.getInputProps('company')}
          /> */}
          <AutoCompleteCompany
            companyName={companyName}
            setCompanyName={handleCompanyChange}
            companies={companiesData}
          />

          <NumberInput
            mt="sm"
            label="price"
            placeholder="price"
            parser={(value) => value.replace(/\₹\s?|(,*)/g, '')}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `₹ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                : '₹ '
            }
            {...form.getInputProps('price')}
          />
          <DateInput
            mt="sm"
            minDate={new Date()}
            label="Expiry Date"
            valueFormat="DD MMM YYYY"
            placeholder="Expiry Date"
            maw={400}
            {...form.getInputProps('date')}
          />
          <NativeSelect
            mt="sm"
            label="Select Category"
            data={categories}
            value={category}
            onChange={(event) => setCategory(event.currentTarget.value)}
          />
          <Group position="center" mt="md">
            <Button disabled={isLoading} type="submit" style={{ width: 340 }}>
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </>
  )
}
