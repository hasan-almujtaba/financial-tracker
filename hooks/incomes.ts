import { useQuery } from 'react-query'
import { supabase } from '@/plugins/supabase'
import { useSession } from 'next-auth/react'
import { IncomeRow } from '@/types/income'

const table = 'incomes'

/**
 * Supabase request to table
 * @param userId - id user creating user
 * @return {IncomeRow} - row data
 */
const getIncomes = async (userId: string) => {
  const { data, error } = await supabase
    .from<IncomeRow>(table)
    .select()
    .eq('user_id', userId)

  if (error) throw error

  return data
}

/**
 * Create react query custom hook
 * @returns {useQuery}
 */
export const useGetIncomes = () => {
  const { data } = useSession()
  const userId = data?.user.id || ''

  return useQuery(['incomes', userId], () => getIncomes(userId))
}
