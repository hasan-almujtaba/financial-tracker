import { IconType } from 'react-icons'
import { Text } from '@mantine/core'
import Link from 'next/link'
import useStyles from './NavigationLink.styles'

interface Props {
  link: string
  label: string
  active: boolean
  Icon: IconType
}

const NavigationLink = ({ Icon, label, link, active }: Props) => {
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
