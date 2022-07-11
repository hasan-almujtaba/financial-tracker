import { useGetTransactions } from '@/hooks/transaction'
import { Transaction } from '@/types/transaction'
import { Tabs } from '@mantine/core'
import { useEffect, useState } from 'react'
import TransactionTable from '../TransactionTable/TransactionTable'

const TransactionTabs = () => {
  const { data } = useGetTransactions('transactions')

  /**
   * Data local state
   */
  const [incomes, setIncomes] = useState<Transaction[]>([])
  const [expenses, setExpenses] = useState<Transaction[]>([])

  /**
   * Separate each transaction type to different variable
   */
  useEffect(() => {
    const separateTransactions = () => {
      if (data) {
        const incomes = data.filter((item) => item.type === 'income')
        setIncomes([...incomes])

        const expenses = data.filter((item) => item.type === 'expense')
        setExpenses(expenses)
      }
    }

    separateTransactions()
  }, [data])

  return (
    <Tabs>
      <Tabs.Tab label="Incomes">
        <TransactionTable
          transactions={incomes}
          type="incomes"
        />
      </Tabs.Tab>
      <Tabs.Tab label="Expenses">
        <TransactionTable
          transactions={expenses}
          type="expenses"
        />
      </Tabs.Tab>
    </Tabs>
  )
}

export default TransactionTabs
