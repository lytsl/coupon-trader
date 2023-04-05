import { AutocompleteItem } from '@mantine/core'
import { AuthUser } from 'features/auth/api'
import { bannerImages } from './data'

export type CreateCouponDTO = {
  code: string
  title: string
  terms: string
  expirydate: Date
  price: number
  company: string
  companylogo: string
  category: keyof typeof bannerImages
}

export type OwnedCouponDTO = CreateCouponDTO & {
  sellerid: string
  buyerid: string | undefined
  dmcolor: string
  incolor: string
  url: string
  couponverified: boolean
  _id: string
}

export type CouponDTO = Omit<OwnedCouponDTO, 'code'>

export type getCouponsDTO = { coupons: OwnedCouponDTO[]; hasMore: boolean; totalCount: number }

export const isCouponDTOList = (x: any): x is OwnedCouponDTO[] =>
  Array.isArray(x) && 'sellerid' in x.at(0)

export type CouponDetailsDTO = OwnedCouponDTO & {
  seller: AuthUser
}

export type CompanyResponseDTO = {
  name: string
  domain: string
  logo: string
}

export type CompanyDTO = CompanyResponseDTO & AutocompleteItem

export type PaymentDTO = { couponid: string }

export type PaymentLinkDTO = PaymentDTO & { url: string }
