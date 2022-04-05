import Head from 'next/head'
import Layout from "../components/layout/Layout";
import {HomeTop} from "../components/home/homeTop/HomeTop";
import {HomeContre} from "../components/home/homeContre/HomeContre";
import {getAllFiles} from "../util/posts-md";
import {PostData} from "../type/post-data";
import {GetStaticProps, NextPage} from "next";

interface PostDataList{
    postData: PostData[]
}

const Home: NextPage<PostDataList> = ({ postData }) => {
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
export const getStaticProps:GetStaticProps = async () => {
    return {
        props: {
            postData: await getAllFiles(),
        },
    };
}
export default Home
