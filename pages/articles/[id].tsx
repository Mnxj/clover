import {getFileIds, getFileData} from "../../util/posts-md";
import Layout from "../../components/layout";
import Head from "next/head";
import {PostData} from "../../type/post-data";
import {Params} from "../../type/params";
import {MarkDown} from "../../components/markDown/MarkDown";
import {PageHeader} from "../../components/markDown/PageHeader/PageHeader";
import React from "react";

const Article = ({postData}: { postData: PostData }) => {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
                <meta name="description" content={postData.description}/>
            </Head>
            <PageHeader title={postData.title} createDate={postData.createDate} updateDate={postData.updateDate} wordCount={postData.wordCount} />
            <MarkDown source={postData.html} />
        </Layout>
    );
}

// post configuration
const postsDir = "articles";

/**
 * 获取博客路径信息
 * @returns [ { params: { id: 'article-01' } } ]
 */
export const getStaticPaths = async () => {
    const paths = (await getFileIds(postsDir)).map((id) => {
        return {params: {id}};
    });
    return {
        paths,
        fallback: false,
    };
}

/**
 * 解析路由获取详细内容
 * @param {*} param0
 * @returns
 */
export const getStaticProps = async ({params}: { params: Params }) => {
    return {
        props: {
            postData: await getFileData(postsDir, params.id),
        },
    };
}

export default Article
