export const bannerImages = {
  food: 'brooke-lark-lcZ9NxhOSlo-unsplash.jpg',
  electronics: 'christopher-gower-_aXa21cf7rY-unsplash.jpg',
  beauty: 'element5-digital-ceWgSMd8rvQ-unsplash.jpg',
  books: 'lilian-dibbern-GX1Dz9cZHc0-unsplash.jpg',
  travel: 'mantas-hesthaven-_g1WdcKcV3w-unsplash.jpg',
  toys: 'michal-bozek-RcxR1aLw8X0-unsplash.jpg',
  home: 'planetcare-23coWmkTNSg-unsplash.jpg',
  clothing: 'tamas-pap-N7lIJLtAegc-unsplash.jpg',
  medicine: 'towfiqu-barbhuiya-w8p9cQDLX7I-unsplash.jpg',
  other: 'christopher-gower-_aXa21cf7rY-unsplash.jpg',
}

export const categories: { value: keyof typeof bannerImages; label: string }[] = [
  { value: 'other', label: 'Select a category' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing & Accessories' },
  { value: 'beauty', label: 'Beauty & Personal Care' },
  { value: 'food', label: 'Food & Grocery' },
  { value: 'travel', label: 'Travel & Transport' },
  { value: 'medicine', label: 'Medication' },
  { value: 'books', label: 'Books' },
  { value: 'home', label: 'Household supplies' },
  { value: 'toys', label: 'Toys' },
]
