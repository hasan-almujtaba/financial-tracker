import React, { useEffect, useState } from 'react'
import {
  BsFileEarmarkSpreadsheet,
  BsWallet,
  BsArrowLeftRight,
  // BsFillStickiesFill,
} from 'react-icons/bs'
import NavigationLink from '@/components/navigation/NavigationLink/NavigationLink'
import { useRouter } from 'next/router'

const links = [
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

const NavigationLinkGroup = () => {
  /**
   * Next router
   */
  const router = useRouter()

  /**
   * State for active link
   */
  const [active, setActive] = useState(router.pathname)

  /**
   * Set active link on router change
   */
  useEffect(() => setActive(router.pathname), [router])

  return (
    <>
      {links.map((item, i) => (
        <NavigationLink
          {...item}
          active={active === item.link}
          key={i}
        />
      ))}
    </>
  )
}

export default NavigationLinkGroup
