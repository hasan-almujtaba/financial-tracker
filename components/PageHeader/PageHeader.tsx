import useStyles from './PageHeader.styles'

interface Props {
  title: string
  subtitle: string
}

const PageHeader = ({ title, subtitle }: Props) => {
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
