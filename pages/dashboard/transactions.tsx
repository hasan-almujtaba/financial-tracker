import { NextPageWithLayout } from '@/types/layout'
import DashboardLayout from '@/components/layouts/DashboardLayout/DashboardLayout'
import { ReactElement } from 'react'
import { dehydrate, QueryClient } from 'react-query'

const DashboardTransactions: NextPageWithLayout = () => {
  return <div>Transaction</div>
}

/**
 * Configure persistent layout
 * @see https://nextjs.org/docs/basic-features/layouts
 */
DashboardTransactions.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

/**
 * dehydrateState for react-query
 * WARNING: Always return dehydrated state object in every page component.
 * @see https://tanstack.com/query/v4/docs/guides/ssr#using-hydration
 */
export const getStaticProps = async () => {
  const queryClient = new QueryClient()

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default DashboardTransactions
