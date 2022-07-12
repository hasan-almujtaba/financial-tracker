import { Tooltip, UnstyledButton } from '@mantine/core'
import { ActionButtonProps } from '@/types/button'
import { useMediaQuery } from '@mantine/hooks'
import useStyles from './ActionButton.styles'

const ActionButton = ({
  children,
  tooltip,
  link,
  target,
  onClick,
}: ActionButtonProps) => {
  /**
   * Use styles
   */
  const { classes, theme } = useStyles()

  /**
   * Mobile media query
   */
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

  /**
   * Return as anchor if link set
   */
  if (link)
    return (
      <Tooltip
        label={tooltip}
        disabled={isMobile}
        transition="fade"
      >
        <a
          className={classes.control}
          href={link}
          target={target}
          onClick={onClick}
        >
          {children}
        </a>
      </Tooltip>
    )

  return (
    <Tooltip
      label={tooltip}
      disabled={isMobile}
      transition="fade"
    >
      <UnstyledButton
        className={classes.control}
        onClick={onClick}
      >
        {children}
      </UnstyledButton>
    </Tooltip>
  )
}

export default ActionButton
