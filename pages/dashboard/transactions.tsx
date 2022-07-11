import { NextPageWithLayout } from '@/types/layout'
import DashboardLayout from '@/components/layouts/DashboardLayout/DashboardLayout'
import { ReactElement } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import Head from 'next/head'
import PageHeader from '@/components/header/PageHeader/PageHeader'
import AddTransaction from '@/components/transactions/AddTransaction/AddTransaction'
import TransactionTabs from '@/components/transactions/TransactionTabs/TransactionTabs'

const DashboardTransactions: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Transaction</title>
      </Head>

      <div>
        <PageHeader
          title="Transaction"
          subtitle="Add your transaction here, all transaction will be saved on the cloud"
        />

        <AddTransaction />

        <TransactionTabs />
      </div>
    </>
  )
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
