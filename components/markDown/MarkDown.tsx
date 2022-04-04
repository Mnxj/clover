import ReactMarkdown from 'react-markdown'
import {Code} from "./code";
import React from "react";
import styles from "./Markdown.module.css"
import gfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from 'remark-math'
import rehypeRaw from "rehype-raw";
import rehypeSlug from 'rehype-slug';
import MarkNav from 'markdown-navbar';
import MarkdownNavbar from 'markdown-navbar';

export const MarkDown: React.FC<{ source: string }> = (props) => {
    // @ts-ignore
    return (
        <div id="markdown" className={styles.markdownContent}>
            <div className="md-content">
                <main id="main" className={styles.mdMain}>
                    <article id="post-md">
                        <div id='md' className={styles.md}>
                            <div className={styles.mdDirectory}>
                                <div className={styles.directory}>
                                    <ol className={styles.directoryList}>
                                        <MarkdownNavbar source={props.source} ordered={false}/>
                                        <li><a
                                            className="toc-link node-name--H2 is-active-link">背景</a></li>
                                        <li><a>安装PHP</a></li>
                                        <li><a
                                            className="toc-link node-name--H2">配置PHP处理器</a></li>
                                        <li><a
                                            className="toc-link node-name--H2">配置Nginx使用PHP</a></li>
                                    </ol>
                                </div>
                            </div>
                            <ReactMarkdown
                                key="content"
                                className={styles.mdContext}
                                children={props.source}
                                remarkPlugins={[remarkMath, gfm]}
                                rehypePlugins={[rehypeSlug, rehypeKatex, rehypeRaw]}
                                components={{
                                    code({node, inline, className, children, ...props}) {
                                        const data = String(children).replace(/\n$/, '')
                                        return <Code
                                            node={node}
                                            inline={inline}
                                            className={className}
                                            children={children}
                                            data={data}
                                            {...props}
                                        />
                                    }
                                }}
                            />
                        </div>
                    </article>
                </main>
            </div>
        </div>
    );
};
