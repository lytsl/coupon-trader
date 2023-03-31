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
} from '@mantine/core'
import { DateInput } from '@mantine/dates'

export function AddCoupon() {
  const form = useForm({
    // validateInputOnBlur: true,
    initialValues: {
      title: '',
      terms: '',
      code: '',
      platform: '',
      price: '',
      date: '',
      category: '',
    },

    validate: {},
  })

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
        <form onSubmit={form.onSubmit((values: any) => {})}>
          <TextInput
            label="Title"
            placeholder="Title"
            {...form.getInputProps('title')}
          />
          <TextInput
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
            {...form.getInputProps('platform')}
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
            label="Expiry Date"
            valueFormat="DD MMM YYYY"
            placeholder="Expiry Date"
            maw={400}
            {...form.getInputProps('date')}
          />
          <NativeSelect
            mt="sm"
            data={['Clothing', 'Electronics', 'Food', 'Service', 'Other']}
            label="Select Category"
            {...form.getInputProps('category')}
          />

          <Group position="center" mt="md">
            <Button type="submit" style={{ width: 340 }}>
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </>
  )
}
