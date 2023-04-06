import { useMemo, useState } from 'react'
import { MantineReactTable, MRT_ColumnDef, MRT_PaginationState } from 'mantine-react-table'
import { ActionIcon, Box, Tooltip, Text, Menu, rem, Group, Loader, Center } from '@mantine/core'
import { IconEdit, IconRefresh, IconTrashFilled } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { axios } from 'lib/axios'
import { couponsKey, useDeleteCoupon } from '../api'

type CouponTableItem = {
  code: string
  title: string
  terms: string
  expirydate: Date
  price: number
  company: string
  companylogo: string
  category: string
  _id: string
}
const couponType = 'sell'
export const ForSellCoupons = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  })

  const { data, isError, isFetching, isLoading, refetch } = useQuery<{
    coupons: CouponTableItem[]
    hasMore: boolean
    totalCount: number
  }>({
    queryKey: [couponsKey, pagination.pageIndex, pagination.pageSize],
    queryFn: async () => {
      return axios.get(`/user/${couponType}`, {
        params: { page: pagination.pageIndex + 1, limit: pagination.pageSize },
      })
      // const data = (await response.data) as {
      //   coupons: CouponTableItem[]
      //   hasMore: boolean
      //   totalCount: number
      // }
      // return data
    },
    keepPreviousData: true,
  })

  console.log(data)

  const columns = useMemo<MRT_ColumnDef<CouponTableItem>[]>(
    () => [
      {
        accessorKey: 'company',
        header: 'Company',
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <img
              alt="avatar"
              height={50}
              src={row.original.companylogo}
              // style={{ borderRadius: '50%' }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: 'code',
        enableClickToCopy: true,
        header: 'Coupon Code',
        size: 100,
      },
      {
        accessorKey: 'price',
        filterVariant: 'range',
        header: 'Salary',
        size: 100,
        Cell: ({ cell }) => (
          <Box
            sx={(theme) => ({
              backgroundColor:
                cell.getValue<number>() < 100
                  ? theme.colors.red[8]
                  : cell.getValue<number>() >= 100 && cell.getValue<number>() < 200
                  ? theme.colors.yellow[8]
                  : theme.colors.green[8],
              borderRadius: '4px',
              color: '#fff',
              maxWidth: '9ch',
              padding: '4px',
              textAlign: 'center',
            })}
          >
            {cell.getValue<number>()?.toLocaleString?.('en-IN', {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        accessorKey: 'expirydate',
        header: 'Expiry Date',
        Cell: ({ cell }) => new Date(cell.getValue<string>())?.toLocaleDateString(),
      },
    ],
    [],
  )

  const { mutate: deleteCoupon, isLoading: isBeingDeleted } = useDeleteCoupon()

  return (
    <Box pos="absolute">
      <MantineReactTable
        enableColumnActions={false}
        enableColumnFilters={false}
        enableSorting={false}
        // enableBottomToolbar={false}
        enableTopToolbar={false}
        columns={columns}
        // enablePagination
        manualPagination
        enableRowActions
        enableStickyHeader
        mantineTableProps={{
          sx: {
            columnWidth: '0',
          },
        }}
        data={data?.coupons ?? []}
        mantineToolbarAlertBannerProps={
          isError
            ? {
                color: 'error',
                children: 'Error loading data',
              }
            : undefined
        }
        onPaginationChange={setPagination}
        renderTopToolbarCustomActions={() => (
          <Tooltip withArrow label="Refresh Data">
            <ActionIcon onClick={() => refetch()}>
              <IconRefresh />
            </ActionIcon>
          </Tooltip>
        )}
        renderDetailPanel={({ row }) => {
          return (
            <Box sx={{ fontSize: rem('16') }} pl={rem(8)}>
              <Group>
                <Text fw={650}>Title:</Text>
                <Text>{row.original.title}</Text>
              </Group>
              <Group>
                <Text fw={650}>Terms & Condiyions:</Text>
                <Text>{row.original.terms}</Text>
              </Group>
            </Box>
          )
        }}
        renderRowActionMenuItems={({ row }) => (
          <>
            <Menu.Item icon={<IconEdit />}>Edit</Menu.Item>
            <Menu.Item onClick={(e) => deleteCoupon(row.original._id)} icon={<IconTrashFilled />}>
              Delete
            </Menu.Item>
          </>
        )}
        rowCount={data?.totalCount ?? 0}
        state={{
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isFetching,
        }}
      />
    </Box>
  )
}
