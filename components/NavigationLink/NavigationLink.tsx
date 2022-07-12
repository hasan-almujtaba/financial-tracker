import { NavigationLinkProps } from '@/types/navigation'
import { Text } from '@mantine/core'
import Link from 'next/link'
import useStyles from './NavigationLink.styles'

const NavigationLink = ({ Icon, label, link, active }: NavigationLinkProps) => {
  /**
   * Use styles from useStyles variable
   */
  const { classes, cx } = useStyles()

  return (
    <>
      <Link href={link}>
        <Text
          key={label}
          className={cx(classes.link, {
            [classes.linkActive]: active,
          })}
        >
          <Icon className={classes.linkIcon} />
          <span>{label}</span>
        </Text>
      </Link>
    </>
  )
}

export default NavigationLink
