import {getFileIds, getFileData} from "../../util/posts-md";
import Layout from "../../components/layout";
import Head from "next/head";
import {PostData} from "../../type/post-data";
import {Params} from "../../type/params";
import {Markdown} from "../../components/MarkDown/markDown";


const Article = ({postData}: { postData: PostData }) => {


    return (
        <Layout title="share.png">
            <Head>
                <title>{postData.title}</title>
                <meta name="description" content={postData.description}/>
            </Head>
            <h1>{postData.title}</h1>
            <p className="time">日期：
                <time dateTime="${postData.dateFriendly}">{postData.dateYMD}</time>
            </p>
            <p className="words">{postData.wordCount}</p>
            <Markdown source={postData.html} />
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
