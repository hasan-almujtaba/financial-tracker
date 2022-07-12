import { dehydrate, QueryClient } from 'react-query'
import { NextPageWithLayout } from '@/types/layout'
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout'
import { ReactElement } from 'react'
import Head from 'next/head'
import PageHeader from '@/components/PageHeader/PageHeader'
import ReportChart from '@/components/ReportChart/ReportChart'
import ReportCardGroup from '@/components/ReportCardGroup/ReportCardGroup'

const DashboardIndex: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Report</title>
      </Head>

      <div>
        <PageHeader
          title="Report"
          subtitle="See your cash flow report from your transaction"
        />

        <ReportCardGroup />

        <ReportChart />
      </div>
    </>
  )
}

/**
 * Configure persistent layout
 * @see https://nextjs.org/docs/basic-features/layouts
 */
DashboardIndex.getLayout = (page: ReactElement) => {
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

export default DashboardIndex
