import {PostData} from "../../../type/post-data";
import Layout from "../../layout/Layout";
import Head from "next/head";
import {HomeTop} from "../homeTop/HomeTop";
import {HomeContre} from "../homeContre/HomeContre";

export const Home = ({ postData }:{postData:PostData[]}) => {
    return(
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