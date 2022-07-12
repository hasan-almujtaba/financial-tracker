import { useFormatter } from '@/hooks/formatter'
import { ReportCardProps } from '@/types/transaction'
import { Card, Text } from '@mantine/core'
import useStyles from './ReportCard.styles'

const ReportCard = ({ title, amount }: ReportCardProps) => {
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
