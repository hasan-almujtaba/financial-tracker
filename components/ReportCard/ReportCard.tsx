import { useFormatter } from '@/hooks/formatter'
import { Card, Text } from '@mantine/core'
import useStyles from './ReportCard.styles'

interface Props {
  title: string
  amount: string | number
}

const ReportCard = ({ title, amount }: Props) => {
  /**
   * Component styles
   */
  const { classes } = useStyles()

  /**
   * Currency formatter
   */
  const { currencyFormatter } = useFormatter()

  return (
    <Card className={classes.card}>
      <Text
        weight={800}
        className={classes.title}
      >
        {title}
      </Text>

      <Text weight={500}>{currencyFormatter(amount as string)}</Text>
    </Card>
  )
}

export default ReportCard
