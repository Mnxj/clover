import {getFileIds, getFileData} from "../../util/posts-md";
import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {PostData} from "../../type/post-data";
import {PageHeader} from "../../components/markDown/PageHeader/PageHeader";
import {GetStaticPaths, GetStaticProps} from "next";
import dynamic from "next/dynamic";
import {LoadAnimation} from "../../components/loadAnimation";

const MarkDownDynamic:any = dynamic(() => import('../../components/markDown/MarkDown').then(mod => mod.MarkDown) as any,
    {loading: () => <LoadAnimation/>})

const Article = ({postData}: { postData: PostData }) => {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
                <meta name="description" content={postData.description}/>
            </Head>
            <PageHeader title={postData.title} createDate={postData.createDate} updateDate={postData.updateDate}
                        wordCount={postData.wordCount}/>
            <MarkDownDynamic source={postData.content}/>
        </Layout>
    );
}


/**
 * 获取博客路径信息
 * @returns [ { params: { id: 'article-01' } } ]
 */
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = (await getFileIds()).map((id) => {
        return {params: {id}};
    });
    return {
        paths,
        fallback: false,
    };
}

/**
 * 解析路由获取详细内容
 * @returns
 */
export const getStaticProps: GetStaticProps = async ({params: {id}}: any) => {
    return {
        props: {
            postData: await getFileData(id),
        },
    };
}

export default Article
