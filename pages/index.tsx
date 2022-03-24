import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from "../components/layout";
import {HomeTop} from "../components/home/homeTop/HomeTop";
import {HomeContre} from "../components/home/homeContre/HomeContre";
import {getAllFiles} from "../util/posts-md";
import {PostData} from "../type/post-data";

const Home: ({postData}: { postData: [PostData] }) => JSX.Element = ({ postData }:{postData:[PostData]}) => {
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
          <HomeContre postData={postData}/>
      </Layout>
  )
}
export const getStaticProps = async () => {
    return {
        props: {
            postData: await getAllFiles("articles"),
        },
    };
}
export default Home
