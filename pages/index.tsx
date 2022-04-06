import {getAllFiles} from "../util/posts-md";
import {PostData} from "../type/post-data";
import {GetStaticProps, NextPage} from "next";
import dynamic from "next/dynamic";
import {LoadAnimation} from "../components/loadAnimation";

interface PostDataList{
    postData: PostData[]
}

const HomeDynamic:any = dynamic(() => import('../components/home/home/home').then(mod => mod.Home) as any,
    {loading: () => <LoadAnimation/>})

const Index: NextPage<PostDataList> = ({ postData }) => {
  return <HomeDynamic postData={postData}/>
}

export const getStaticProps:GetStaticProps = async () => {
    return {
        props: {
            postData: await getAllFiles(),
        },
    };
}
export default Index
