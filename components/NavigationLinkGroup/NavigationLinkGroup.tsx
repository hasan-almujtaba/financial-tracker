import React, { useEffect, useState } from 'react'
import NavigationLink from '@/components/NavigationLink/NavigationLink'
import { useRouter } from 'next/router'
import { links } from './data'

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
