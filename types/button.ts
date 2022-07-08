import { ReactNode } from 'react'

export interface ActionButtonProps {
  children: ReactNode
  tooltip?: string
  link?: string
  target?: string
  onClick?: () => void
}
