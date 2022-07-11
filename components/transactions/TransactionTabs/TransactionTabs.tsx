import { useGetTransactions } from '@/hooks/transaction'
import { Tabs } from '@mantine/core'
import TransactionTable from '../TransactionTable/TransactionTable'

const TransactionTabs = () => {
  const incomes = useGetTransactions('incomes')
  const expenses = useGetTransactions('expenses')

  return (
    <Tabs>
      <Tabs.Tab label="Incomes">
        <TransactionTable
          transactions={incomes.data || []}
          type="incomes"
        />
      </Tabs.Tab>
      <Tabs.Tab label="Expenses">
        <TransactionTable
          transactions={expenses.data || []}
          type="expenses"
        />
      </Tabs.Tab>
    </Tabs>
  )
}

export default TransactionTabs
