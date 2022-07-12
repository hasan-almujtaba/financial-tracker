import { NextPageWithLayout } from '@/types/layout'
import DefaultLayout from '@/components/DefaultLayout/DefaultLayout'
import { ReactElement } from 'react'
import { Button } from '@mantine/core'
import { dehydrate, QueryClient } from 'react-query'
import { BsArrowRight, BsGoogle } from 'react-icons/bs'
import Head from 'next/head'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

const Home: NextPageWithLayout = () => {
  const { data } = useSession()

  const onLoginButtonClick = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        {data ? (
          <Link href="/dashboard">
            <Button
              variant="outline"
              sx={() => ({
                textTransform: 'capitalize',
              })}
              leftIcon={<BsArrowRight size={18} />}
            >
              Go to dashboard
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            sx={() => ({
              textTransform: 'capitalize',
            })}
            leftIcon={<BsGoogle size={18} />}
            onClick={onLoginButtonClick}
          >
            Login with google
          </Button>
        )}
      </div>
    </>
  )
}

/**
 * Configure persistent layout
 * @see https://nextjs.org/docs/basic-features/layouts
 */
Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
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

export default Home
