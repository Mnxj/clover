import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link";
import Layout from "../components/layout";

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
          <h1>Next.js 博客网站</h1>
          <p>
              这个博客网站将使用 <a href="https://nextjs.org/">Next.js</a>。
          </p>
          <p>
              更多内容请点击{" "}
              <Link href="/about">
                  <a>关于我们...</a>
              </Link>
          </p>
      </Layout>
  )
}

export default Home
