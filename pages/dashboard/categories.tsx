import { dehydrate, QueryClient } from 'react-query'
import { NextPageWithLayout } from '@/types/layout'
import DashboardLayout from '@/components/layouts/DashboardLayout/DashboardLayout'
import { ReactElement } from 'react'
import Head from 'next/head'
import PageHeader from '@/components/header/PageHeader/PageHeader'
import CategoryTable from '@/components/categories/CategoryTable/CategoryTable'
import AddCategory from '@/components/categories/AddCategory/AddCategory'

const DashboardCategories: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Category</title>
      </Head>

      <div>
        <PageHeader
          title="Category"
          subtitle="Organize your transaction categories here, the categories you add will be saved in local storage"
        />

        <AddCategory />

        <CategoryTable />
      </div>
    </>
  )
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
