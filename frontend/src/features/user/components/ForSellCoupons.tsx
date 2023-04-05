import { useMemo, useState } from 'react'
import { MantineReactTable, MRT_ColumnDef, MRT_PaginationState } from 'mantine-react-table'
import { ActionIcon, Box, Tooltip, Text, Menu, rem, Group } from '@mantine/core'
import { IconEdit, IconRefresh, IconTrashFilled } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { axios } from 'lib/axios'

type CouponTableItem = {
  code: string
  title: string
  terms: string
  expirydate: Date
  price: number
  company: string
  companylogo: string
  category: string
}
const couponType = 'sell'
export const ForSellCoupons = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isError, isFetching, isLoading, refetch } = useQuery<{
    coupons: CouponTableItem[]
    hasMore: boolean
    totalCount: number
  }>({
    queryKey: ['table-data', pagination.pageIndex, pagination.pageSize],
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

  const columns = useMemo<MRT_ColumnDef<CouponTableItem>[]>(
    () => [
      {
        accessorKey: 'company',
        header: 'Company',
        size: 200,
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
              height={30}
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

  return (
    <MantineReactTable
      enableColumnActions={false}
      enableColumnFilters={false}
      enablePagination={false}
      enableSorting={false}
      enableBottomToolbar={false}
      enableTopToolbar={false}
      columns={columns}
      data={data?.coupons ?? []}
      manualPagination
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
      renderDetailPanel={({ row }) => (
        <Group
          spacing={rem(4)}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          pl={rem(8)}
        >
          <Box>
            <Text>Terms & Condiyions:</Text>
            <Text>{row.original.terms}</Text>
          </Box>
        </Group>
      )}
      renderRowActionMenuItems={() => (
        <>
          <Menu.Item icon={<IconEdit />}>Edit</Menu.Item>
          <Menu.Item icon={<IconTrashFilled />}>Update</Menu.Item>
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
  )
}
