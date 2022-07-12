import { PageHeaderProps } from '@/types/header'
import useStyles from './PageHeader.styles'

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  /**
   * Use styles from useStyles variable
   */
  const { classes } = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.subtitle}>{subtitle}</div>
    </div>
  )
}

export default PageHeader
