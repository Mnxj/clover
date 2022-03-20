import Layout from "../components/layout";
import Head from "next/head";

const About = () => {
    return (
        <Layout title="share.png">
            <Head>
                <title>关于我们</title>
            </Head>

            <h1>关于我们</h1>
            <p>
                DevPoint 是 WEB
                开发的分享中心，用自己的热情来分享互联网的点滴，以此激励自己加强学习提升自我。
            </p>
            <p>
                <a href="https://www.devpoint.cn/index.shtml">DevPoint.cn</a>
                ，取<code>develope point</code>
                之意，是一个关注互联网、探索互联网技术及应用的个人博客，因个人兴趣，激励自己学习而建立的。曾经是
                <code>lav.so</code>、互次元，由于
                平时喜欢去网上欣赏好的网站和应用，关注新的技术，以此来开阔自己的思维，激励自己的不断去学习，将自己喜欢的资料和学习笔记收集起来，扩展自己的技能和思维，始终保持一个学习的态度。
            </p>
        </Layout>
    );
}

export  default About
