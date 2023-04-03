import { AutocompleteItem, MantineColor, SelectItemProps } from '@mantine/core'
import { UserResponse } from 'features/auth/api'
import { bannerImages } from './data'

export type CreateCouponDTO = {
  code: string
  title: string
  terms: string
  expirydate: string
  price: number
  company: string
  companylogo: string
  category: keyof typeof bannerImages
}

export type CouponDTO = CreateCouponDTO & {
  sellerid: string
  couponverified: boolean
  _id: string
}

export type CouponDetailsDTO = CouponDTO & {
  seller: Omit<UserResponse, 'accessToken'>
}

export type CompanyResponseDTO = {
  name: string
  domain: string
  logo: string
}

export type CompanyProps = CompanyResponseDTO & AutocompleteItem

export type PaymentDTO = { couponid: string }

export type PaymentLinkDTO = PaymentDTO & { url: string }
