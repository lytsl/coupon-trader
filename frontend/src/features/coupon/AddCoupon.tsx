import { useForm } from '@mantine/form'
import {
  Box,
  TextInput,
  Button,
  Group,
  Title,
  Space,
  NumberInput,
  NativeSelect,
  Textarea,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { CreateCouponDTO, useCreateCoupon } from './api'

export function AddCoupon() {
  const form = useForm({
    // validateInputOnBlur: true,
    initialValues: {
      code: '',
      title: '',
      terms: '',
      date: new Date(),
      expirydate: '',
      price: 0,
      company: '',
      companylogo: '',
      category: '',
    } as CreateCouponDTO & {
      date: Date
    },

    validate: {},
  })

  const { mutate: create, isLoading } = useCreateCoupon()
  return (
    <>
      <center>
        <Title mt="sm" style={{ fontSize: 28, fontWeight: 900 }}>
          Add Coupon
        </Title>
      </center>
      <Box
        sx={{ maxWidth: 270 }}
        mx="auto"
        style={{ marginBottom: 30, marginTop: 30 }}
      >
        {/* <LoadingOverlay visible={isLoading} overlayBlur={2} /> */}
        <form
          onSubmit={form.onSubmit((values: any) => {
            console.log(values)
            create({
              ...values,
              expirydate: values.date.toLocaleString().split(',')[0],
              companylogo: values.company,
              category: values.company,
            } as CreateCouponDTO)
          })}
        >
          <TextInput
            label="Title"
            placeholder="Title"
            {...form.getInputProps('title')}
          />
          <Textarea
            mt="sm"
            label="Terms"
            placeholder="Terms & Conditions"
            {...form.getInputProps('terms')}
          />
          <TextInput
            mt="sm"
            label="Code"
            placeholder="Code"
            {...form.getInputProps('code')}
          />
          <TextInput
            mt="sm"
            label="Platform"
            placeholder="Platform"
            {...form.getInputProps('company')}
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
          {/* FIXME: select category */}
          <NativeSelect
            mt="sm"
            data={['Clothing', 'Electronics', 'Food', 'Service', 'Other']}
            label="Select Category"
            {...form.getInputProps('category')}
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
