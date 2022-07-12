import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { supabase } from '@/plugins/supabase'
import { useSession } from 'next-auth/react'
import { Transaction } from '@/types/transaction'
import { useFormatter } from './formatter'

/**
 * Supabase request to table
 * @param userId - id user creating user
 * @return {IncomeRow} - row data
 */
const getTransactions = async ({
  userId,
  table,
}: {
  userId: string
  table: string
}) => {
  const { data, error } = await supabase
    .from<Transaction>(table)
    .select()
    .eq('user_id', userId)

  if (error) throw error

  return data
}

/**
 * Create react query custom hook
 * @returns {useQuery}
 */
export const useGetTransactions = (table: string) => {
  const { data } = useSession()
  const userId = data?.user.id || ''

  return useQuery([table, { userId, table }], () =>
    getTransactions({ userId, table })
  )
}

export const useSeparateTransactions = (transaction: Transaction[]) => {
  /**
   * Hooks for formatting
   */
  const { dateFormatter } = useFormatter()

  /**
   * Data local state
   */
  const [incomes, setIncomes] = useState<Transaction[]>([])
  const [expenses, setExpenses] = useState<Transaction[]>([])
  const [dates, setDates] = useState<(string | Date)[]>()

  /**
   * Separate each transaction type to different variable
   */
  useEffect(() => {
    const separateTransactions = () => {
      if (transaction) {
        const incomes = transaction.filter((item) => item.type === 'income')
        setIncomes([...incomes])

        const expenses = transaction.filter((item) => item.type === 'expense')
        setExpenses(expenses)

        const dates = transaction.map((item) =>
          dateFormatter(item.date as string, 'DD-MM-YYYY')
        )
        /**
         * Workaround to ts error for [...new Set(dates)]
         * @see https://stackoverflow.com/questions/33464504/using-spread-syntax-and-new-set-with-typescript
         */
        const uniqueDates = [...Array.from(new Set(dates))]
        const sortedDates = uniqueDates.sort((a, b) => {
          /**
           * Workaround for doing arithmetic on date
           * @see https://github.com/microsoft/TypeScript/issues/5710
           */
          return +a - +b
        })
        setDates(sortedDates)
      }
    }

    separateTransactions()
  }, [transaction]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    incomes,
    expenses,
    dates,
  }
}

/**
 * Sum amount transaction based on date
 * @param data - Transaction Data
 * @returns Transaction grouped by date
 */
export const useTransactionByDate = (data: Transaction[]) => {
  const totalAmount = data.reduce((previous: Transaction[], current) => {
    const item = previous.find((item) => item.date === current.date)

    if (item) {
      item.amount = +item.amount + +current.amount
    } else {
      previous.push({
        ...current,
        amount: +current.amount,
      })
    }

    return previous
  }, [])

  const results = totalAmount.map((item) => item.amount)

  return results
}

/**
 * count total amount of transaction
 * @param transaction - Transaction data
 * @returns total amount of transaction
 */
export const useTotalTransactions = (transaction: Transaction[]) => {
  // sum amount of transaction
  const total = transaction.reduce((acc: number, cur: Transaction) => {
    return acc + parseInt(cur.amount as string)
  }, 0)

  return total
}
