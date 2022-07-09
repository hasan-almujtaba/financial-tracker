import { dehydrate, QueryClient } from 'react-query'
import { NextPageWithLayout } from '@/types/layout'
import DashboardLayout from '@/components/layouts/DashboardLayout/DashboardLayout'
import { ReactElement } from 'react'

const DashboardCategories: NextPageWithLayout = () => {
  return <div>Categories</div>
}

/**
 * Configure persistent layout
 * @see https://nextjs.org/docs/basic-features/layouts
 */
DashboardCategories.getLayout = (page: ReactElement) => {
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

export default DashboardCategories
