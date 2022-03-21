import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from "../components/layout";
import {HomeTop} from "../components/homeTop/HomeTop";

const Home: NextPage = () => {
  return (
      <Layout>
          <Head>
              <title>Clover</title>
              <meta
                  name="description"
                  content="这是一个由 Next.js 驱动的网站"
              />
          </Head>
          <HomeTop/>
      </Layout>
  )
}

export default Home
