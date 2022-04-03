import ReactMarkdown from 'react-markdown'
import {Code} from "./code";
import React from "react";
import styles from "./Markdown.module.css"
import gfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from 'remark-math'
import rehypeRaw from "rehype-raw";
import remarkToc from "remark-toc";
import rehypeSlug from 'rehype-slug';

export const MarkDown: React.FC<{ source: string }> = (props) => {
    return (
        <div id="markdown" className={styles.markdownContent}>
            <div className="md-content">
                <main id="main" className={styles.mdMain}>
                    <article id="post-md">
                        <div className={styles.mdDirectory}>
                            <div className="directory">
                                {/*<MarkdownNavbar source={props.source} ordered={false}/>*/}
                            </div>
                        </div>
                        <div className={styles.md}>
                            <ReactMarkdown
                                key="content"
                                children={props.source}
                                remarkPlugins={[remarkToc, remarkMath, gfm]}
                                rehypePlugins={[rehypeSlug,rehypeKatex, rehypeRaw]}
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
