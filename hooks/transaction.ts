import { useQuery } from 'react-query'
import { supabase } from '@/plugins/supabase'
import { useSession } from 'next-auth/react'
import { IncomeRow } from '@/types/income'
import { Transaction } from '@/types/transaction'

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
