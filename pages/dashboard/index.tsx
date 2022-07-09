import { dehydrate, QueryClient } from 'react-query'
import { useSession } from 'next-auth/react'
import { useGetIncomes } from '@/hooks/incomes'

const DashboardIndex = () => {
  const { data } = useGetIncomes()
  return <div>isin</div>
}

/**
 * dehydrateState for react-query
 * WARNING: Always return dehydrated state object in every page component.
 */
export const getStaticProps = async () => {
  const queryClient = new QueryClient()

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default DashboardIndex
