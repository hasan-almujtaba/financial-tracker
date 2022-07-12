import {
  useGetTransactions,
  useSeparateTransactions,
  useTransactionByDate,
} from '@/hooks/transaction'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import useStyles from './ReportChart.styles'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Cash Flow',
    },
  },
}

const ReportChart = () => {
  /**
   * Component styles
   */
  const { classes } = useStyles()

  /**
   * React query custom hooks for fetching data
   */
  const { data } = useGetTransactions('transactions')

  /**
   * Hooks for creating separate transactions
   */
  const { expenses, incomes, dates } = useSeparateTransactions(data as [])

  /**
   * group transactions by date
   */
  const incomesByDate = useTransactionByDate(incomes)
  const expensesByDate = useTransactionByDate(expenses)

  /**
   * Chart configuration
   */
  const labels = dates
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Incomes',
        data: incomesByDate,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Expenses',
        data: expensesByDate,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <div className={classes.container}>
      <Bar
        data={chartData}
        options={chartOptions}
      />
    </div>
  )
}

export default ReportChart
