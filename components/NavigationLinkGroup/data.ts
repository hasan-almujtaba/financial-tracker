import {
  BsFileEarmarkSpreadsheet,
  BsWallet,
  BsArrowLeftRight,
} from 'react-icons/bs'

export const links = [
  {
    link: '/dashboard',
    label: 'Report',
    Icon: BsFileEarmarkSpreadsheet,
  },
  { link: '/dashboard/categories', label: 'Category', Icon: BsWallet },
  {
    link: '/dashboard/transactions',
    label: 'Transaction',
    Icon: BsArrowLeftRight,
  },
]
