import {
  useGetTransactions,
  useTotalTransactions,
  useSeparateTransactions,
} from '@/hooks/transaction'
import ReportCard from '../ReportCard/ReportCard'
import useStyles from './ReportCardGroup.styles'

const ReportCardGroup = () => {
  /**
   * Component styles
   */
  const { classes } = useStyles()

  /**
   * React query cache
   */
  const { data } = useGetTransactions('transactions')

  /**
   * Hooks for creating separate transactions
   */
  const { incomes, expenses } = useSeparateTransactions(data as [])

  /**
   * Count Total Amount
   */
  const totalIncomes = useTotalTransactions(incomes)
  const totalExpenses = useTotalTransactions(expenses)

  return (
    <div className={classes.container}>
      <ReportCard
        title="Total Incomes"
        amount={totalIncomes}
      />
      <ReportCard
        title="Total Expenses"
        amount={totalExpenses}
      />
    </div>
  )
}

export default ReportCardGroup
